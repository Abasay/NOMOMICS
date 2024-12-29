/**
 * Middleware to verify user logged in and is an an admin.
 */

import { NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import Admin, { ISessionAdmin } from '@src/models/Admin';

import { IReq, IRes } from '../common/types';
import { RouteError } from '@src/common/classes';

// **** Variables **** //

const USER_UNAUTHORIZED_ERR = 'User not authorized to perform this action';

type TSessionData = ISessionAdmin & JwtPayload;

/**
 * See note at beginning of file.
 */
async function adminMW(req: IReq, res: IRes, next: NextFunction) {
	// Get session data
	const token = req.headers.authorization?.split(' ')[1] || '';
	console.log(token);
	if (!token) {
		return res
			.status(HttpStatusCodes.UNAUTHORIZED)
			.json({ error: USER_UNAUTHORIZED_ERR });
	}
	// const sessionData = await SessionUtil.getSessionData<TSessionData>(req);

	const decodeToken = (await SessionUtil.decodeJwt(
		token
	)) as TSessionData;

	console.log(decodeToken);
	// Set session data to locals
	if (typeof decodeToken === 'object' && decodeToken?.role === 'Admin') {
		// res.locals.sessionUser = sessionData;
		req.body = { ...req.body, ...decodeToken };
		const admin = await Admin.findById(decodeToken.id);

		if (!admin)
			throw new RouteError(
				HttpStatusCodes.NOT_FOUND,
				'Admin not found'
			);

		req.body = { ...req.body, ...decodeToken };
		req.admin = admin;
		console.log();
		return next();
		// Return an unauth error if admin is not an admin
	} else {
		return res
			.status(HttpStatusCodes.UNAUTHORIZED)
			.json({ error: USER_UNAUTHORIZED_ERR });
	}
}

// **** Export Default **** //

export default adminMW;
