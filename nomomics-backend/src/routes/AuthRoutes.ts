import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthService from '@src/services/AuthService';

import { IReq, IRes } from './common/types';
import check from './common/check';


// **** Functions **** //

/**
 * Signup a user.
 * @param req
 * @param res
 */

async function signup(req: IReq, res: IRes) {
  const [email, password, name, address] = check.isStr(req.body, ['email', 'password', 'name', 'address'])
  const user = await AuthService.signup(email, password, name, address);
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  // Return
  return res.status(HttpStatusCodes.OK).end();

}

/**
 * Login a user.
 */
async function login(req: IReq, res: IRes) {
  const [email, password] = check.isStr(req.body, ['email', 'password']),
    user = await AuthService.login(email, password);
  // Setup Admin Cookie
  await SessionUtil.addSessionData(res, {
    id: user._id,
    email: user.name,
    name: user.name,
    role: user.role,
  });
  // Return
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).end();
}



// **** Export default **** //


export default {
  login,
  logout,
  signup,
} as const;
