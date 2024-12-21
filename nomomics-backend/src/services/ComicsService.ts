import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Comic from '@src/models/comic.model';
import Comics from '@src/models/Comics';
import ComicMarket from '@src/models/marketplace.comic';
import User from '@src/models/User';
import {
	uploadBase64ImageToCloudinary,
	uploadBase64PdfToCloudinary,
} from '@src/util/cloudinary';
import { ObjectId } from 'mongoose';
import { v1 as uuidv1 } from 'uuid';
import Comment, { IComment } from '@src/models/Comment';
import Like, { ILike } from '@src/models/Likes';
import saveModel from '@src/models/save.model';
import followersModel from '@src/models/followers.model';
import viewModel from '@src/models/view.model';

async function getComicsFileUrl(
	id: ObjectId,
	base64File: string
): Promise<string> {
	const user = await User.User.findById(id);
	if (!user) {
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);
	}
	const comicsUrl = await uploadBase64PdfToCloudinary(
		base64File,
		'Nomomic_Comics',
		'dummy'
	);

	return comicsUrl;
}

async function UploadAComic(
	files: string,
	title: string,
	subTitle: string,
	description: string,
	category: string,
	author: string,
	synopsis: string,
	genre: string,
	location: string,
	owner: string,
	coverImage: string,
	ageLimit: boolean,
	episode: number,
	filesType: string
) {
	let comic;

	comic = await Comic.findOne({ title, author });
	// const comicsUrl = (await uploadBase64PdfToCloudinary(
	//   files,
	//   owner,
	//   title.split('')[0] + '.pdf'
	// )) as string;

	const coverImageUrl = await uploadBase64ImageToCloudinary(
		coverImage,
		owner
	);

	// console.log(coverImage);

	if (comic) {
		await comic.updateOne({
			$push: {
				episodes: {
					episodeNumber: episode,
					episodeTitle: title,
					episodeFileUrl: [...files],
					episodeCoverImage: coverImageUrl,
					filesType,
					episodeId: uuidv1(),
				},
			},
		});
	} else {
		comic = await Comic.create({
			fileUrl: [...files],
			author,
			title,
			subTitle,
			description,
			synopsis,
			category,
			genre,
			location,
			coverImage: coverImageUrl,
			ageLimit,
			owner,
			episodes: [
				{
					episodeNumber: episode,
					episodeTitle: title,
					episodeFileUrl: [...files],
					episodeCoverImage: coverImageUrl,
					filesType,
					episodeId: uuidv1(),
				},
			],
		});
	}

	return {
		...comic.toObject(),
		episodes: [
			...comic.episodes,
			{
				episodeNumber: episode,
				episodeTitle: title,
				episodeFileUrl: [...files],
				episodeCoverImage: coverImageUrl,
				filesType,
			},
		],
	};
}

async function UploadAComicToMarketPlace(
	files: string,
	title: string,
	subTitle: string,
	description: string,
	category: string,
	author: string,
	synopsis: string,
	genre: string,
	location: string,
	owner: string,
	coverImage: string,
	ageLimit: boolean,
	episode: number,
	filesType: string,
	price: number
) {
	let comic;

	comic = await ComicMarket.findOne({ title, author });

	const coverImageUrl = await uploadBase64ImageToCloudinary(
		coverImage,
		owner
	);

	// console.log(coverImage);

	if (comic) {
		await comic.updateOne({
			$push: {
				episodes: {
					episodeNumber: episode,
					episodeTitle: title,
					episodeFileUrl: [...files],
					episodeCoverImage: coverImageUrl,
					filesType,
				},
			},
		});
	} else {
		comic = await ComicMarket.create({
			fileUrl: [...files],
			author,
			title,
			subTitle,
			description,
			synopsis,
			category,
			genre,
			location,
			coverImage: coverImageUrl,
			ageLimit,
			owner,
			episodes: [
				{
					episodeNumber: episode,
					episodeTitle: title,
					episodeFileUrl: [...files],
					episodeCoverImage: coverImageUrl,
					filesType,
				},
			],
			price,
		});
	}

	return {
		...comic.toObject(),
		episodes: [
			...comic.episodes,
			{
				episodeNumber: episode,
				episodeTitle: title,
				episodeFileUrl: [...files],
				episodeCoverImage: coverImageUrl,
				filesType,
			},
		],
	};
}

async function makeAcomment(
	message: string,
	userId: ObjectId,
	comicId: ObjectId,
	episodeId: string,
	parentCommentId?: ObjectId
): Promise<IComment[]> {
	const user = await User.User.findById(userId);

	if (!user)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);

	const comic = await Comic.findById(comicId);

	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);

	const comment = await Comment.Comment.create({
		content: message,
		parentCommentId,
		userId,
		comicId,
		episodeId,
		authorId: comic.owner,
	});

	const episodeIdExists = comic?.episodes.find(
		(e) => String(e._id) === String(episodeId)
	);

	if (!episodeIdExists)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Episode not found'
		);

	const comments = await Comment.Comment.find({
		comicId: comicId,
		episodeId: episodeIdExists._id,
		parentCommentId: null,
	}).populate([
		{
			path: 'replies',
			populate: {
				path: 'userId',
				select: 'name fullName nickName profileImage',
			},
		},
		{
			path: 'userId',
			select: 'name fullName nickName profileImage',
		},
	]);

	return comments;
}

async function likeAndUnlikeAComment(
	comicId: ObjectId,
	commentId: ObjectId,
	episodeId: string,
	userId: ObjectId,
	commentorId: ObjectId
) {
	const comic = await Comic.findById(comicId);

	let message;

	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);

	const comment = await Comment.Comment.findOne({
		_id: commentId,
		comicId,
		episodeId,
		userId: commentorId,
	});

	if (!comment)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comment not found!'
		);

	console.log('LIKING ............');

	if (
		comment.likes.some(
			(like) => String(like.user) === String(userId)
		)
	) {
		await comment.updateOne({
			$pull: {
				likes: {
					user: userId,
				},
			},
		});
		message = 'You have successfully unliked this comment!';
	} else {
		await comment.updateOne({
			$push: {
				likes: {
					user: userId,
				},
			},
		});

		message = 'You have successfully liked this comment!';
	}

	await comment.save();

	const comments = await Comment.Comment.find({
		comicId,
		episodeId,
		parentCommentId: null,
	}).populate([
		{
			path: 'replies',
			populate: {
				path: 'userId',
				select: 'name fullName nickName profileImage',
			},
		},
		{
			path: 'userId',
			select: 'name fullName nickName profileImage',
		},
	]);
	return { comments, message };
}
async function likeAComic(
	comicId: ObjectId,
	userId: ObjectId,
	isLiked: boolean,

	episodeId?: string
): Promise<{ like: ILike; message: string }> {
	const user = await User.User.findById(userId);

	if (!user)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);

	const comic = await Comic.findById(comicId);
	let like, message;

	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);

	if (episodeId) {
		like = await Like.findOne({
			comicId,
			userId,
			episodeId,
		});
	} else {
		like = await Like.findOne({
			comicId,
			userId,
		});
	}

	if (like && episodeId)
		await Like.updateOne(
			{ userId, comicId, episodeId },
			{ isLiked: isLiked, isDisliked: !isLiked }
		);
	else if (like && !episodeId)
		await Like.updateOne(
			{ userId, comicId },
			{ isLiked: isLiked, isDisLiked: !isLiked }
		);
	else
		like = await Like.create({
			comicId,
			userId,
			episodeId,
			isLiked: isLiked,
			isDisliked: !isLiked,
			authorId: comic.owner,
		});

	message = episodeId
		? isLiked
			? 'You have successfully liked this episode'
			: 'You have successfully disliked this episode.'
		: isLiked
		? 'You have successfully liked this comic'
		: 'You have successfully unliked this comic';

	return { like, message };
}

async function saveComic(comicId: ObjectId, userId: ObjectId) {
	const comic = await Comic.findById(comicId);
	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);
	const user = await User.User.findById(userId);
	if (!user)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);

	let message: string;

	let savedComic = await saveModel.findOne({ comicId, userId });
	if (savedComic) {
		await saveModel.deleteOne({ comicId, userId });
		message = 'You have successfully unsaved this comic!';
	} else {
		savedComic = await saveModel.create({
			comicId,
			userId,
			authorId: comic.owner,
		});
		message = 'You have successfully saved this comic!';
	}

	return message;
}

async function followComic(comicId: ObjectId, userId: ObjectId) {
	const comic = await Comic.findById(comicId);
	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);
	const user = await User.User.findById(userId);
	if (!user)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found'
		);

	let message: string;

	let follower = await followersModel.findOne({ comicId, userId });
	if (follower) {
		await followersModel.deleteOne({
			comicId,
			userId,
		});
		message = 'You have successfully unfollowed this comic!';
	} else {
		follower = await followersModel.create({
			comicId,
			userId,
			authorId: comic.owner,
		});
		message = 'You have successfully followed this comic!';
	}

	return message;
}

async function viewComic(
	comicId: ObjectId,
	episodeId: string,
	userId: ObjectId,
	ipAddress?: string
) {
	const comic = await Comic.findOne({
		comicId,
		'episodes.episodeId': episodeId,
	});

	if (!comic)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'Comic not found!'
		);
	const user = await User.User.findById(userId);
	if (!user)
		throw new RouteError(
			HttpStatusCodes.NOT_FOUND,
			'User not found!'
		);

	const view = await viewModel.create({
		comicId,
		episodeId,
		userId,
		ipAddress,
		authorId: comic.owner,
	});
	return view;
}

export default {
	getComicsFileUrl,
	UploadAComic,
	UploadAComicToMarketPlace,
	makeAcomment,
	likeAComic,
	likeAndUnlikeAComment,
	saveComic,
	followComic,
	viewComic,
} as const;
