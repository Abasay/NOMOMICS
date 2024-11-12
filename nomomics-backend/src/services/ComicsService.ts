import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Comic from '@src/models/comic.model';
import Comics from '@src/models/Comics';
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
  uploadedFile: string,
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
  ageLimit: boolean
) {
  const comicsUrl = await uploadBase64PdfToCloudinary(
    uploadedFile,
    owner,
    title + '.pdf'
  );
  const coverImageUrl = await uploadBase64ImageToCloudinary(coverImage, owner);

  // console.log(coverImage);
  const comic = await Comic.create({
    fileUrl: comicsUrl,
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
  });

  return comic;
}
export default {
  getComicsFileUrl,
  UploadAComic,
} as const;
