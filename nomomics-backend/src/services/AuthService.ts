import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

import User, { IUser } from '@src/models/User';
import { generateVerifyEmailTemplate } from '@src/views/verifyEmail';
import { generateSixDigitToken } from '@src/util';
import Token from '@src/models/Token';
import check from '@src/routes/common/check';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
// import sendMail from '@src/util/sendEmail';
const sendMail = require('@src/util/sendEmail');

const client = new OAuth2Client(process.env.GOOGLE_CLIET_SECRET as string);

// Define an interface for the response
interface GoogleUserInfo extends TokenPayload {}

async function verifyIdToken(idToken: string): Promise<GoogleUserInfo | null> {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIET_SECRET as string,
    });
    console.log('Ticket:', ticket.getPayload());
    return ticket.getPayload() as GoogleUserInfo;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email ${email} not found`;
  },
} as const;

// **** Functions **** //

/**
 * Signup a user.
 * @param email
 * @param password
 * @param fullName
 */

async function signup(
  email: string,
  password: string,
  fullName: string,
  isAdult: boolean,
  specialOffers: boolean,
  role: string,
  signupMethod: string
): Promise<IUser> {
  // Check if user already exists
  console.log('Checking if user exists');
  const userExists = await User.User.findOne({ email });
  if (userExists) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
  }
  // Hash password
  const pwdHash = PwdUtil.hashSync(password);
  // Create user
  const user = await User.User.create({
    email,
    fullName,
    password: pwdHash,
    isAdult,
    specialOffers,
    role,
    signupMethod,
  });

  const otp = generateSixDigitToken();

  const token = await Token.create({
    email: email,
    fullName: fullName,
    otp: otp,
    dateExpire: new Date(Date.now() + 5 * 60000),
    role: 'User',
  });

  const mail = generateVerifyEmailTemplate(user.fullName, otp);
  const sendEmail = await sendMail({
    from: process.env.MY_GMAIL || '',
    to: user.email,
    subject: 'Verify your email address',
    html: mail,
  });
  // Return
  return user;
}

async function signupWithGoogle(idToken: string, role: string): Promise<IUser> {
  // Check if user already exists

  //GOOGLE AUTHENTICATION
  const verifyUserWithGoogle = await verifyIdToken(idToken);

  if (!verifyUserWithGoogle) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid Google Token');
  }

  const { name, picture, email } = verifyUserWithGoogle;

  const userExists = await User.User.findOne({ email });
  console.log('Checking if user exists');
  if (userExists) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'User already exists');
  }
  // Create user

  const user = await User.User.create({
    email,
    fullName: name,
    password: '',
    isAdult: true,
    specialOffers: false,
    profileImage: picture,
    role: role,
    signupMethod: 'Google',
  });

  return user;
}

/**
 * Login a user.
 * @param email
 * @param password
 * @returns
 */

async function login(email: string, password: string): Promise<IUser> {
  // Fetch user
  const user = await User.User.findOne({ email }).select(
    '-verificationToken  '
  );
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Account not found',
      Errors.EmailNotFound(email)
    );
  }

  if (!user.isAccountVerified) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Account not verified',
      'Please verify your email address'
    );
  }

  if (user.isAccoutLocked) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Account Locked',
      'Sorry, your account has been locked'
    );
  }

  // if (user.loginAttempts === 0) {
  //   throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Account is locked');
  // }

  let loginAttempts = user.loginAttempts;
  // Check password
  const hash = user.password ?? '',
    pwdPassed = await PwdUtil.compare(password, hash);

  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    loginAttempts = loginAttempts - 1;
    if (loginAttempts === 0) {
      user.isAccoutLocked = true;
      user.loginAttempts = 0;
      await user.save();
      await tick(500);
      throw new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        'Account is locked',
        'Your account has been locked due to multple failed login attempts'
      );
    }
    user.loginAttempts = loginAttempts;
    await user.save();
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Invalid Login Credentials',
      loginAttempts + ' login attempts before your account is blocked.'
    );
  }
  // Return
  return user;
}

/**
 * Verify user email.
 * @param token
 * @returns
 */

async function verifyEmail(
  otp: string,
  email: string,
  fullName: string
): Promise<IUser> {
  // Fetch user
  const user = await User.User.findOne({ email }).select(
    '-verificationToken -isAccountVerified -isAccoutLocked'
  );
  console.log('User:', user);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }

  const token = await Token.findOne({
    email: email,
    fullName: fullName,
    otp: otp,
    // dateExpire: { $gt: new Date() },
  });

  if (!token)
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Token not found');

  if (token.dateExpire < new Date())
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Token expired');
  // Verify email
  user.isAccountVerified = true;
  user.verificationToken = '';
  await user.save();
  // Return
  return user;
}

/**
 * Resend verification email.
 * @param email
 * @password
 * @returns
 *
 */

async function resendVerificationEmail(
  email: string,
  password: string
): Promise<IUser> {
  // Fetch user
  const user = await User.User.findOne({ email });
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  // Check password
  const hash = user.password ?? '',
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    throw new RouteError(HttpStatusCodes.UNAUTHORIZED, 'Invalid password');
  }

  if (user.isAccountVerified) {
    throw new RouteError(HttpStatusCodes.CONFLICT, 'Account already verified');
  }
  // Generate new token
  const otp = generateSixDigitToken();
  let token = await Token.findOne({ email: email });

  if (token && token?.dateExpire > new Date())
    throw new RouteError(HttpStatusCodes.CONFLICT, 'Token already sent.');

  if (!token) {
    token = await Token.create({
      email: email,
      username: user.fullName,
      otp: otp,
      dateExpire: new Date(Date.now() + 5 * 60000),
      role: 'User',
    });
  } else {
    token.otp = otp;
    token.dateExpire = new Date(Date.now() + 5 * 60000);
    await token.save();
  }

  const mail = generateVerifyEmailTemplate(user.fullName, otp);
  const sendEmail = await sendMail({
    from: process.env.MY_GMAIL || '',
    to: user.email,
    subject: 'Verify your email address',
    html: mail,
  });
  // Return
  return user;
}
// **** Export default **** //

export default {
  login,
  signup,
  verifyEmail,
  resendVerificationEmail,
  signupWithGoogle,
} as const;
