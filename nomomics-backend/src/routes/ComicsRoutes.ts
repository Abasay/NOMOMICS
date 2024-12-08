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
  const [base64File, title] = check.isStr(req.body, ['base64File', 'title']);
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
  const comics = await Comic.find({});

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
  const comic = await Comic.findById(req.params.id);

  if (!comic) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      success: false,
      message: 'Comic not found',
    });
  }

  return res.status(HttpStatusCodes.OK).json({
    success: true,
    data: comic,
  });
}

async function checkComic(req: IReq, res: IRes) {
  const [author, title] = check.isStr(req.body, ['author title']);
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
} as const;
