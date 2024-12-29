/**
 * Shared types for routes.
 */

import { Response, Request } from 'express';
import { ISessionUser, IUser } from '@src/models/User';
import { IAdmin } from '@src/models/Admin';

// **** Express **** //

type TObj = Record<string, unknown>;

export interface IReq extends Request<TObj, void, TObj, TObj> {
	signedCookies: Record<string, string>;
	user: IUser;
	admin?: IAdmin;
}

interface ILocals {
	sessionUser: ISessionUser;
}

export type IRes = Response<unknown, ILocals>;
