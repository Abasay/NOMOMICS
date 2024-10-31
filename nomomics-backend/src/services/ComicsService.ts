import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Comics from '@src/models/Comics';
import User from '@src/models/User';
import { uploadBase64PdfToCloudinary } from '@src/util/cloudinary';
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
    'Nomomic_Comics'
  );

  return comicsUrl;
}

export default {
  getComicsFileUrl,
} as const;
