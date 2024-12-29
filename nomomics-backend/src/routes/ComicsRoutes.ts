import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { ObjectId } from 'mongoose';
import ComicsService from '@src/services/ComicsService';
import Comics from '@src/models/Comics';
import Comic from '@src/models/comic.model';
import {
	uploadBase64ImageToCloudinary,
	uploadBase64PdfToCloudinary,
} from '@src/util/cloudinary';
import ComicMarket from '@src/models/marketplace.comic';
import path from 'path';
import Comment from '@src/models/Comment';
import saveModel from '@src/models/save.model';
import followersModel from '@src/models/followers.model';
import viewModel from '@src/models/view.model';
import Like from '@src/models/Likes';
import { RouteError } from '@src/common/classes';

/** Get Comics file Url */
async function getComicsFileUrl(req: IReq, res: IRes) {
	const [base64File] = check.isStr(req.body, ['base64File']);
	const comicsUrl = await ComicsService.getComicsFileUrl(
		req.body.id as ObjectId,
		base64File
	);
	return res
		.status(HttpStatusCodes.OK)
		.json({ success: true, data: { comicsUrl } });
}

async function uploadComic(req: IReq, res: IRes) {
	const [
		title,
		subTitle,
		description,
		category,
		author,
		synopsis,
		genre,
		location,
		coverImage,
		filesType,
	] = check.isStr(req.body, [
		'title',
		'subTitle',
		'description',
		'category',
		'author',
		'synopsis',
		'genre',
		'location',
		'coverImage',
		'filesType',
	]);

	// console.log(coverImage);

	const comicUpload = await ComicsService.UploadAComic(
		req.body.files as unknown as string,
		title,
		subTitle,
		description,
		category,
		author,
		synopsis,
		genre,
		location,
		req.body.id as any,
		coverImage,
		req.body.ageLimit as boolean,
		req.body.episode as number,
		filesType
	);

	return res.json({
		success: true,
		data: { comic: comicUpload },
	});
}

async function uploadComicToMarketPlace(req: IReq, res: IRes) {
	const [
		title,
		subTitle,
		description,
		category,
		author,
		synopsis,
		genre,
		location,
		coverImage,
		filesType,
	] = check.isStr(req.body, [
		'title',
		'subTitle',
		'description',
		'category',
		'author',
		'synopsis',
		'genre',
		'location',
		'coverImage',
		'filesType',
	]);
	const [price] = check.isNum(req.body, ['price']);

	// console.log(coverImage);

	const comicUpload = await ComicsService.UploadAComicToMarketPlace(
		req.body.files as unknown as string,
		title,
		subTitle,
		description,
		category,
		author,
		synopsis,
		genre,
		location,
		req.body.id as any,
		coverImage,
		req.body.ageLimit as boolean,
		req.body.episode as number,
		filesType,
		price
	);

	return res.json({
		success: true,
		data: { comic: comicUpload },
	});
}

async function uploadComicPicsToCloudinary(req: IReq, res: IRes) {
	const [base64File, title] = check.isStr(req.body, ['base64File']);
	const imageUrl = (await uploadBase64ImageToCloudinary(
		base64File,
		title
	)) as string;

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			url: imageUrl,
		},
	});
}

async function uploadComicPdfsToCloudinary(req: IReq, res: IRes) {
	const [base64File, title] = check.isStr(req.body, [
		'base64File',
		'title',
	]);
	const pdfUrl = (await uploadBase64PdfToCloudinary(
		base64File,
		req.body.id as string,
		title.split('')[0] + '.pdf'
	)) as string;

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			url: pdfUrl,
		},
	});
}

async function allComics(req: IReq, res: IRes) {
	const comics = await Comic.find({}).sort({ createdAt: -1 });

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			comics,
		},
	});
}

async function allMarketPlaceComics(req: IReq, res: IRes) {
	const comics = await ComicMarket.find().populate({
		path: 'owner', // Refers to the populated field
		select: 'nickName fullName profileImage email phoneNumber location', // Fields to select from the populated owner
	});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			comics,
		},
	});
}

async function userComics(req: IReq, res: IRes) {
	const comics = await Comic.find({
		owner: req.body.id,
	});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: comics,
	});
}

async function getComic(req: IReq, res: IRes) {
	const { id, episodeId } = req.params;
	console.log(id, episodeId);
	const comic = await Comic.findById(id);
	let comments, episodeIdExists;

	if (comic) {
		if (episodeId)
			episodeIdExists = comic?.episodes.find(
				(e) =>
					Number(e.episodeNumber) ===
					Number(episodeId)
			);
		else episodeIdExists = comic?.episodes[0];

		const searchEpisode = comic?.episodes.find(
			(e) => Number(e.episodeNumber) === Number(episodeId)
		);
		console.log(typeof episodeId, episodeIdExists);

		if (
			searchEpisode === undefined &&
			String(episodeId) !== 'null'
		) {
			return res.status(HttpStatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Ooops, Episode not found',
			});
		}

		if (episodeIdExists) {
			comments = await Comment.Comment.find({
				comicId: id,
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
		}
	}

	if (!comic) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Comic not found',
		});
	}

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: comic,
		comments: comments ? comments : [],
	});
}

async function getComments(req: IReq, res: IRes) {
	const { id, episodeId } = req.params;
	console.log(id, episodeId);
	const comic = await Comic.findById(id);
	let comments;

	if (comic) {
		console.log(comic?.episodes);
		const episodeIdExists = comic?.episodes.find(
			(e) => Number(e.episodeNumber) === Number(episodeId)
		);

		if (!episodeIdExists) {
			return res.status(HttpStatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Episode not found',
			});
		}

		comments = await Comment.Comment.find({
			comicId: id,
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
	}

	if (!comic) {
		return res.status(HttpStatusCodes.NOT_FOUND).json({
			success: false,
			message: 'Comic not found',
		});
	}

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: comic,
		comments,
	});
}

async function checkComic(req: IReq, res: IRes) {
	const [author, title] = check.isStr(req.body, ['title', 'author']);
	const comic = await Comic.findOne({ author, title });

	if (comic) {
		return res.status(HttpStatusCodes.OK).json({
			success: false,
			message: 'Comic already exists',
			exist: true,
		});
	}

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		message: 'Comic does not exist',
		exist: false,
	});
}

async function makeAcomment(req: IReq, res: IRes) {
	const [comicId, episodeId, userId, message] = check.isStr(req.body, [
		'comicId',
		'episodeId',
		'userId',
		// 'parentCommentId',
		'message',
	]);

	const comment = await ComicsService.makeAcomment(
		message,
		userId as unknown as ObjectId,
		comicId as unknown as ObjectId,
		episodeId,
		req.body.parentCommentId as unknown as ObjectId
	);
	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: comment,
	});
}

async function likeAComic(req: IReq, res: IRes) {
	const [comicId, userId] = check.isStr(req.body, ['comicId', 'userId']);
	const [isLiked] = check.isBool(req.body, ['isLiked']);

	const like = await ComicsService.likeAComic(
		comicId as unknown as ObjectId,
		userId as unknown as ObjectId,
		isLiked,
		req.body.episodeId as string
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: like,
	});
}

async function likeAndUnlikeAComment(req: IReq, res: IRes) {
	const [comicId, commentId, episodeId, userId, commentorId] =
		check.isStr(req.body, [
			'comicId',
			'commentId',
			'episodeId',
			'userId',
			'commentorId',
		]);

	const like = await ComicsService.likeAndUnlikeAComment(
		comicId as unknown as ObjectId,
		commentId as unknown as ObjectId,
		episodeId,
		userId as unknown as ObjectId,
		commentorId as unknown as ObjectId
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: like,
	});
}

async function getNestedComments(req: IReq, res: IRes) {
	const [commentId, parentCommentId] = check.isStr(req.body, [
		'commentId',
	]);

	const comment = await Comment.Comment.findById(commentId).populate([
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

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: comment,
	});
}

async function saveComic(req: IReq, res: IRes) {
	const [comicId, userId] = check.isStr(req.body, ['comicId', 'userId']);

	const save = await ComicsService.saveComic(
		comicId as unknown as ObjectId,
		userId as unknown as ObjectId
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: save,
	});
}

async function followComic(req: IReq, res: IRes) {
	const [comicId, userId] = check.isStr(req.body, ['comicId', 'userId']);

	const follow = await ComicsService.followComic(
		comicId as unknown as ObjectId,
		userId as unknown as ObjectId
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: follow,
	});
}

async function getSavedComics(req: IReq, res: IRes) {
	const [userId] = check.isStr(req.body, ['userId']);

	const savedComics = await saveModel.find({ userId: userId }).populate({
		path: 'comicId',
		select: 'title subTitle description category author synopsis genre location coverImage filesType episodes',
	});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: savedComics,
	});
}

async function getFollowers(req: IReq, res: IRes) {
	const [comicId] = check.isStr(req.body, ['comicId']);

	const followers = await followersModel
		.find({ comicId: comicId })
		.populate({
			path: 'userId',
			select: 'nickName fullName profileImage email phoneNumber location',
		});

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: followers,
	});
}

async function viewComic(req: IReq, res: IRes) {
	const [comicId, userId, episodeId] = check.isStr(req.body, [
		'comicId',
		'userId',
		'episodeId',
	]);

	const view = await ComicsService.viewComic(
		comicId as unknown as ObjectId,
		episodeId as unknown as string,
		userId as unknown as ObjectId
	);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: view,
	});
}

async function metrics(req: IReq, res: IRes) {
	const user = req.user;

	if (user.role !== 'Creator')
		throw new RouteError(
			HttpStatusCodes.UNAUTHORIZED,
			'User not authorized'
		);

	const views = await viewModel
		.find({ authorId: user._id })
		.countDocuments();
	const comments = await Comment.Comment.find({
		authorId: user._id,
	}).countDocuments();
	const likes = await Like.find({
		authorId: user._id,
		isLiked: true,
	}).countDocuments();
	const dislikes = await Like.find({
		authorId: user._id,
		isDisliked: true,
	}).countDocuments();
	const saved = await saveModel
		.find({ authorId: user._id })
		.countDocuments();

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			views,
			comments,
			likes,
			saved,
			dislikes,
		},
	});
}

async function getUnapprovedComicsAsEpisodes(req: IReq, res: IRes) {
	const episodes = await Comic.aggregate([
		{
			$unwind: '$episodes', // Flatten the episodes array
		},
		{
			$match: {
				'episodes.isApproved': false, // Filter for unapproved episodes
			},
		},
		{
			$sort: {
				'episodes.date': 1, // Sort episodes by date in ascending order
			},
		},
		{
			$project: {
				_id: 0,
				// title: '$episodes.title', // Assuming episodes have a title field
				// description: '$episodes.description', // Assuming episodes have a description field
				// date: '$episodes.date', // Include the date field for sorting
				// comicTitle: '$title', // Include the comic's title if needed
				episodeNumber: '$episodes.episodeNumber',
				episodeTitle: '$episodes.episodeTitle',
				episodeFileUrl: '$episodes.episodeFileUrl',
				episodeCoverImage:
					'$episodes.episodeCoverImage',
				dateUploaded: '$episodes.dateUploaded',
				filesType: '$episodes.filesType',
				episodeId: '$episodes.episodeId',
				isApproved: '$episodes.isApproved',
			},
		},
	]);

	return res.status(HttpStatusCodes.OK).json({
		success: true,
		data: {
			episodes,
		},
	});
}

// **** Functions **** //

export default {
	getComicsFileUrl,
	uploadComic,
	allComics,
	userComics,
	getComic,
	checkComic,
	uploadComicPicsToCloudinary,
	uploadComicPdfsToCloudinary,
	uploadComicToMarketPlace,
	allMarketPlaceComics,
	makeAcomment,
	likeAComic,
	likeAndUnlikeAComment,
	getComments,
	getNestedComments,
	saveComic,
	followComic,
	getSavedComics,
	getFollowers,
	viewComic,
	metrics,
	getUnapprovedComicsAsEpisodes,
} as const;
