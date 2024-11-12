import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { ObjectId } from 'mongoose';
import ComicsService from '@src/services/ComicsService';
import Comics from '@src/models/Comics';
import Comic from '@src/models/comic.model';

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
    uploadedFile,
    title,
    subTitle,
    description,
    category,
    author,
    synopsis,
    genre,
    location,
    coverImage,
  ] = check.isStr(req.body, [
    'uploadedFile',
    'title',
    'subTitle',
    'description',
    'category',
    'author',
    'synopsis',
    'genre',
    'location',
    'coverImage',
  ]);

  // console.log(coverImage);

  const comicUpload = await ComicsService.UploadAComic(
    uploadedFile,
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
    req.body.ageLimit as boolean
  );

  return res.json({
    success: true,
    data: { comic: comicUpload },
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

// **** Functions **** //

export default {
  getComicsFileUrl,
  uploadComic,
  allComics,
  userComics,
  getComic,
} as const;
