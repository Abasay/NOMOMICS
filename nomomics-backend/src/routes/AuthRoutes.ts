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
	const [email, password, fullName, role, signupMethod] = check.isStr(
		req.body,
		['email', 'password', 'fullName', 'role', 'signupMethod']
	);

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
		specialOffers,
		role,
		signupMethod
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
 * Signup with Google
 */

async function signupWithGoogle(req: IReq, res: IRes) {
	// const [email] = check.isValidEmail(req.body, 'email');
	const [role, googleIdToken] = check.isStr(req.body, [
		'role',
		'googleIdToken',
	]);

	// console.log(role, googleIdToken);

	const user = await AuthService.signupWithGoogle(googleIdToken, role);

	const userObj = user.toObject();

	const { password, ...userWithoutPassword } = userObj;

	const newToken = await SessionUtil.signedJwt({
		id: user._id,
		email: user.email,
		fullName: user.fullName,
		role: user.role,
	});
	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Signup successful',
			token: newToken,
			userWithoutPassword,
		},
	});
}

/**
 * Login a user.
 */
async function login(req: IReq, res: IRes) {
	const [email] = check.isStr(req.body, ['email', 'password']),
		user = await AuthService.login(
			email,
			req.body.password as string
		);
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
 * Login a user with google
 */

async function loginWithGoogle(req: IReq, res: IRes) {
	const [googleIdToken] = check.isStr(req.body, ['googleIdToken']);
	const user = await AuthService.loginWithGoogle(googleIdToken);
	const userObj = user.toObject();
	const {
		password,
		isAccountVerified,
		isAccoutLocked,
		...userWithoutPassword
	} = userObj;

	const newToken = await SessionUtil.signedJwt({
		id: user._id,
		email: user.email,
		fullName: user.fullName,
		role: user.role,
	});
	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Login successful',
			token: newToken,
			user: userWithoutPassword,
		},
	});
}

/**
 * Verify a user's email.
 * @param req
 * @param res
 * @returns
 */

async function verifyEmail(req: IReq, res: IRes) {
	const [otp, email, fullName] = check.isStr(req.body, [
		'otp',
		'email',
		'fullName',
	]);
	const user = await AuthService.verifyEmail(otp, email, fullName);
	const newToken = await SessionUtil.signedJwt({
		id: user._id,
		email: user.email,
		fullName: user.fullName,
		role: user.role,
	});
	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Email verified successfully',
			user,
			token: newToken,
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
		user = await AuthService.resendVerificationEmail(
			email,
			password
		);
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
	signupWithGoogle,
	loginWithGoogle,
} as const;
