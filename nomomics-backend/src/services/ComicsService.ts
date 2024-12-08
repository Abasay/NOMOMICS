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

async function getComicsFileUrl(
  id: ObjectId,
  base64File: string
): Promise<string> {
  const user = await User.User.findById(id);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
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
  const coverImageUrl = await uploadBase64ImageToCloudinary(coverImage, owner);

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

  const coverImageUrl = await uploadBase64ImageToCloudinary(coverImage, owner);

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
export default {
  getComicsFileUrl,
  UploadAComic,
  UploadAComicToMarketPlace,
} as const;
