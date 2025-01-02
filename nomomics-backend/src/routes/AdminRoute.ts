import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq, IRes } from './common/types';
import AdminService from '@src/services/AdminService';
import check from './common/check';
import SessionUtil from '@src/util/SessionUtil';
import Comics from '@src/models/Comics';
import User from '@src/models/User';
import Comic from '@src/models/comic.model';
import notificationModel from '@src/models/notification.model';

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


async function getAllComics(req: IReq, res: IRes) {
	const comics = await Comics.find({}).select('-__v');

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			comics,
		},
	});
}


async function getAllUsers(req:IReq, res: IRes) {
	const users = await User.User.find({}).select('-_v');

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			users,
		},
	});
}

async function approveAComic(req: IReq, res: IRes) {

	const admin = req.admin;

	if(!admin) return res.status(HttpStatusCodes.UNAUTHORIZED).json({success: false, error: 'Unauthorized'});

	const [comicId, episodeId] = check.isStr(req.body, ['comicId', 'episodeId']);

	const findComic = await Comic.findById(comicId)
	let findEpisode, getEpisode

	if (findComic){
		 findEpisode = findComic?.episodes.find(episode => String(episode._id) === episodeId)
		getEpisode = findComic?.episodes.find(episode => String(episode._id) === episodeId)

	}
	
	if(findEpisode?.isApproved) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json({
			success: false,
			error: 'Comic already approved',
		});
	}

	const comic = await Comic.findByIdAndUpdate(comicId, {
		'$set': {
			'episodes.$[elem].isApproved': true,
			'episodes.$[elem].approvedAt': new Date(),
			'episodes.$[elem].approvedBy': admin._id,
			'episodes.$[elem].approvalStatus': 'Approved'
		}
		}, {
		arrayFilters: [{ 'elem._id': episodeId }],
		new: true
		});



	if (!comic) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			error: 'Comic not found',
		});
	}

	if(getEpisode){
		const creatorNotification = await notificationModel.create({
			creatorId: comic.owner,
			type: 'COMIC_APPROVED',
			message: 'Episode ' + getEpisode.episodeNumber  + ' of your comic has been approved. It is now available for viewing',
			isRead: false,
			comicId: comic._id,
			episodeId: episodeId
		});
	} else{
		const creatorNotification = await notificationModel.create({
			creatorId: comic.owner,
			type: 'COMIC_APPROVED',
			message: 'An Episode of your comic just got approved.',
			isRead: false,
			comicId: comic._id,
			episodeId: episodeId
		});
	}


	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Comic approved',
			comic
		},
	});
}


async function  disaApproveComic(req:IReq, res: IRes){
	const admin = req.admin;

	if(!admin) return res.status(HttpStatusCodes.UNAUTHORIZED).json({success: false, error: 'Unauthorized'});

	const [comicId, episodeId] = check.isStr(req.body, ['comicId', 'episodeId']);

	const findComic = await Comic.findById(comicId)
	let findEpisode

	if (findComic){
		 findEpisode = findComic?.episodes.find(episode => String(episode._id) === episodeId)

	

	}

	if(!findEpisode?.isApproved) {
		return res.status(HttpStatusCodes.BAD_REQUEST).json({
			success: false,
			error: 'Episode already disapproved',
		});
	}
	
	const comic = await Comic.findByIdAndUpdate(comicId, {
		'$set': {
			'episodes.$[elem].isApproved': false,
			'episodes.$[elem].approvedAt': new Date(),
			'episodes.$[elem].approvedBy': admin._id,
			'episodes.$[elem].approvalStatus': 'Disapproved'
		}
		}, {
		arrayFilters: [{ 'elem._id': episodeId }],
		new: true
		});

	if (!comic) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			error: 'Comic not found',
		});
	}

		const creatorNotification = await notificationModel.create({
			creatorId: comic.owner,
			type: 'COMIC_DISAPPROVED',
			message: 'Episode ' + findEpisode.episodeNumber +  ' of your comic has been disapproved.',
			isRead: false,
			comicId: comic._id,
			episodeId: episodeId
		});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'Comic disapproved',
			comic
		},
	});
}

async function editUser(req: IReq, res: IRes) {
	const [userId, roleToBeAssigned] =
		check.isStr(req.body, ['userId', 'roleToBeAssigned']);

	const user = await User.User.findByIdAndUpdate(userId, {
		role: roleToBeAssigned,
	}, { new: true });
	
	if(!user) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			error: 'User not found',
		});
	}

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'User edited successfully',
			user,
		},
	});
}

async function deleteUser(req: IReq, res: IRes) {
	const userId = check.isStr(req.body, 'userId');

	const user = await User.User.findByIdAndDelete(userId);

	if(!user) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			error: 'User not found',
		});
	}

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			message: 'User deleted successfully',
		},
	});
}

export default {
	AdminSignup,
	resendEmailVerification,
	verifyEmail,
	AdminLogin,
	getProfile,
	getAllComics,
	getAllUsers,
	approveAComic,
	disaApproveComic,
	editUser, deleteUser
} as const;
