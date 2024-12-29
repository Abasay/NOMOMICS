import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import AdminService from '@src/services/AdminService';
import check from './common/check';
import SessionUtil from '@src/util/SessionUtil';

async function AdminSignup(req: IReq, res: IRes) {
	const [fullName, email, password, username, phoneNumber, profileImage, dateOfBirth] =
		check.isStr(req.body, [
			'fullName',
			'email',
			'password',
			'username',
			'phoneNumber',
			'profileImage',
			'dateOfBirth',
		]);

	if (!check.isValidEmail(req.body, 'email')) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json({
			success: false,
			error: 'Invalid email format',
		});
	}

	const admin = await AdminService.AdminSignup(
		fullName,
		email,
		password,
		// role,
		username,
		phoneNumber,
		profileImage,
		dateOfBirth
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Admin signup successful',
		},
	});
}


async function resendEmailVerification(req: IReq, res: IRes) {
	const [email, password] = check.isStr(req.body, ['email', 'password']);

	const token = await AdminService.resendVerificationEmail(email, password);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Email verification resent',
		},
	});
}

async function verifyEmail(req: IReq, res: IRes) {
	const [email, otp] = check.isStr(req.body, ['email', 'otp']);

	const admin = await AdminService.verifyEmail(otp, email);

		const token = await SessionUtil.signedJwt({
			id: admin._id,
			email: admin.email,
			fullName: admin.fullName,
			role: admin.role,
		});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Email verified successfully',
			token
		},
	});
}

async function AdminLogin(req: IReq, res: IRes) {
	const [username, password] = check.isStr(req.body, ['username', 'password']);

	const {admin} = await AdminService.AdminLogin(username, password);

	const token = await SessionUtil.signedJwt({
		id: admin._id,
		email: admin.email,
		fullName: admin.fullName,
		role: admin.role

	})

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Admin login successful',
			 token
		},
	});
}


async function getProfile(req: IReq, res: IRes) {
	const user = req.admin

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			user,
		},
	});
}
export default {
	AdminSignup,
	resendEmailVerification,
	verifyEmail,
	AdminLogin,
	getProfile
} as const;
