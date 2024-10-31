import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

import User, { IUser } from '@src/models/User';
import { generateVerifyEmailTemplate } from '@src/views/verifyEmail';
// import sendMail from '@src/util/sendEmail';
const sendMail = require('@src/util/sendEmail');

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
  specialOffers: boolean
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
  });

  const token = await user.generateJWTVerificationToken();
  const mail = generateVerifyEmailTemplate(user.fullName, token);
  const sendEmail = await sendMail({
    from: process.env.MY_GMAIL || '',
    to: user.email,
    subject: 'Verify your email address',
    html: mail,
  });
  // Return
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

async function verifyEmail(token: string): Promise<IUser> {
  // Fetch user
  const user = await User.User.findOne({ verificationToken: token }).select(
    '-verificationToken -isAccountVerified -isAccoutLocked'
  );
  console.log('User:', user);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Token not found');
  }
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
  const token = await user.generateJWTVerificationToken();
  const mail = generateVerifyEmailTemplate(user.fullName, token);
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
} as const;
