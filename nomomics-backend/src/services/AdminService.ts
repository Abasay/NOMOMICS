import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Admin, { IAdmin } from '@src/models/Admin';
import notificationModel from '@src/models/notification.model';
import Token from '@src/models/Token';
import { generateSixDigitToken } from '@src/util';
import { uploadBase64ImageToCloudinary } from '@src/util/cloudinary';
import PwdUtil from '@src/util/PwdUtil';
import sendMail from '@src/util/sendEmail';
import { generateVerifyEmailTemplate } from '@src/views/verifyEmail';
// import { HttpStatusCode } from "axios";
import bcrypt from 'bcrypt';

async function AdminSignup(
	fullName: string,
	email: string,
	password: string,
	username: string,
	phoneNumber: string,
	profileImage: string,
	dateOfBirth: string
) {
	const adminExist = await Admin.findOne({
		$or: [{ email }, { username }, { phoneNumber }],
	});

	if (adminExist) {
		throw new RouteError(
			HttpStatusCodes.CONFLICT,
			'Admin already exists'
		);
	}
	const role = 'Admin';

	const hashedPasswd = await bcrypt.hash(password, 10);

	const profileImg = await uploadBase64ImageToCloudinary(profileImage, `Admin/${username}`);

	const admin = await Admin.create({
		fullName,
		email,
		password: hashedPasswd,
		role,
		username,
		phoneNumber,
		profileImage: profileImg,
		isVerified: false,
		dateOfBirth,
	});

	const otp = generateSixDigitToken();

	const token = await Token.create({
		email: email,
		fullName: fullName,
		otp: otp,
		dateExpire: new Date(Date.now() + 5 * 60000),
		role: 'Admin',
	});

	const mail = generateVerifyEmailTemplate(fullName, otp);

	const sendEmail = await sendMail({
		from: process.env.MY_GMAIL || '',
		to: admin.email,
		subject: 'Verify your email address',
		html: mail,
	});

	return {
		message: 'Account created successfully, please verify your account',
	};
}

async function AdminLogin(username: string, password: string) {
	const admin = await Admin.findOne({ username });

	if (!admin) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Admin not found'
		);
	}

	const pwdPassed = await bcrypt.compare(password, admin.password);

	if (!pwdPassed) {
		throw new RouteError(
			HttpStatusCodes.UNAUTHORIZED,
			'Invalid password'
		);
	}

	return { message: 'Admin logged in successfully', admin };
}


async function resendVerificationEmail(
	email: string,
	password: string
): Promise<IAdmin> {
	// Fetch user
	const user = await Admin.findOne({ email });
	if (!user) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);
	}
	// Check password
	const hash = user.password ?? '',
		pwdPassed = await PwdUtil.compare(password, hash);
	if (!pwdPassed) {
		throw new RouteError(
			HttpStatusCodes.UNAUTHORIZED,
			'Invalid password'
		);
	}

	if (user.isVerified) {
		throw new RouteError(
			HttpStatusCodes.CONFLICT,
			'Account already verified'
		);
	}
	// Generate new token
	const otp = generateSixDigitToken();
	let token = await Token.findOne({ email: email });

	if (token && token?.dateExpire > new Date())
		throw new RouteError(
			HttpStatusCodes.CONFLICT,
			'Token already sent, please wait for 5 minutes before trying again.'
		);

	if (!token) {
		token = await Token.create({
			email: email,
			username: user.fullName,
			otp: otp,
			dateExpire: new Date(Date.now() + 5 * 60000),
			role: 'Admin',
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


async function verifyEmail(
	otp: string,
	email: string
	// fullName: string
): Promise<IAdmin> {
	// Fetch user
	const admin = await Admin.findOne({ email }).select(
		'-verificationToken -isAccountVerified -isAccoutLocked'
	);
	console.log('admin:', admin);
	if (!admin) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Admin not found'
		);
	}

	const token = await Token.findOne({
		email: email,
		fullName: admin.fullName,
		otp: otp,
		role: 'Admin',
		// dateExpire: { $gt: new Date() },
	});

	if (!token)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Token not found'
		);

	if (token.dateExpire < new Date())
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Token expired'
		);
	// Verify email
	admin.isVerified = true;
	await admin.save();

	const notification = await notificationModel.create({
		creatorId: admin._id,
		type: 'SYSTEM_ALERT',
		message: 'Account verified successfully',
		isRead: false,
	});


		await token.deleteOne();

	// Return
	return admin;
}

export default {
	AdminSignup,
	AdminLogin,
	resendVerificationEmail,
	verifyEmail,
} as const;
