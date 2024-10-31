import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthService';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { Console } from 'console';

// **** Functions **** //

/**
 * Signup a user.
 * @param req
 * @param res
 */

async function signup(req: IReq, res: IRes) {
  const [email, password, fullName] = check.isStr(req.body, [
    'email',
    'password',
    'fullName',
  ]);

  if (!check.isValidEmail(req.body, 'email')) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  const [isAdult, specialOffers] = check.isBool(req.body, [
    'isAdult',
    'specialOffers',
  ]);
  // const getCookie = await SessionUtil.getSessionData(req);
  // console.log(getCookie);
  const user = await AuthService.signup(
    email,
    password,
    fullName,
    isAdult,
    specialOffers
  );
  // Setup Admin Cookie
  const cookieSession = await SessionUtil.addSessionData(res, {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  });
  console.log(cookieSession.req.headers.cookie);

  // const getCookie = await SessionUtil.getSessionData(req);
  // console.log(getCookie);
  // // Return

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {
      message: 'Signup successful',
    },
  });
}

/**
 * Login a user.
 */
async function login(req: IReq, res: IRes) {
  const [email] = check.isStr(req.body, ['email', 'password']),
    user = await AuthService.login(email, req.body.password as string);
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, {
    id: user._id,
    email: user.fullName,
    fullName: user.fullName,
    role: user.role,
  });

  const signedJwt = await SessionUtil.signedJwt({
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  });

  console.log(signedJwt);
  // Return
  const { password, ...userWithoutPassword } = user;
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: { user: userWithoutPassword, token: signedJwt },
  });
}

/**
 * Verify a user's email.
 * @param req
 * @param res
 * @returns
 */

async function verifyEmail(req: IReq, res: IRes) {
  const token = check.isStr(req.body, 'token');
  const user = await AuthService.verifyEmail(token);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {
      message: 'Email verified successfully',
      user,
    },
  });
}

/**
 * Resend email verification.
 * @param req
 * @param res
 * @returns
 */
async function resendEmail(req: IReq, res: IRes) {
  const [email, password] = check.isStr(req.body, ['email', 'password']),
    user = await AuthService.resendVerificationEmail(email, password);
  // Return
  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: {
      message: 'Email verification sent successfully',
    },
  });
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).json({
    success: true,
  });
}

// **** Export default **** //

export default {
  login,
  logout,
  signup,
  verifyEmail,
  resendEmail,
} as const;
