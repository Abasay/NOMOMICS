import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

import User, { IUser } from '@src/models/User';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


// **** Functions **** //


/**
 * Signup a user.
 * @param email
 * @param password
 * @param name
 */

async function signup(email: string, password: string, name: string, address: string): Promise<IUser> {
  // Check if user already exists
  const userExists = await User.User.findOne({ email });
  if (userExists) {
    throw new RouteError(
      HttpStatusCodes.CONFLICT,
      'User already exists',
    );
  }
  // Hash password 
  const pwdHash = PwdUtil.hashSync(password);
  // Create user
  const user = await User.User.create({
    email, name, password: pwdHash,
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
  const user = await User.User.findOne({ email });
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }

  if (user.isAccoutLocked) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Account is locked',
    );
  }


  if (user.loginAttempts === 0) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      'Account is locked',
    );
  }

  let loginAttempts = user.loginAttempts;
  // Check password
  const hash = (user.password ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);

  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    loginAttempts = loginAttempts - 1;
    if (loginAttempts === 0) {
      user.isAccoutLocked = true;
      user.loginAttempts = 0;
      await user.save()
      await tick(500);
      throw new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        'Your account has been locked due multple failed login attempts',
      );
    }
    user.loginAttempts = loginAttempts
    await user.save()
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.Unauth,
    );
  }
  // Return
  return user;
}


// **** Export default **** //

export default {
  login,
  signup
} as const;
