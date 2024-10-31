import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import User, { IUser } from '@src/models/User';
import { ObjectId } from 'mongoose';
import {
  uploadBase64ImageToCloudinary,
  uploadBase64PdfToCloudinary,
} from '@src/util/cloudinary';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

async function getUserById(id: ObjectId): Promise<IUser> {
  const user = await User.User.findById(id).select(
    '-password -loginAttempts -verificationToken -isAccountVerified -isAccoutLocked'
  );
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
}

async function uploadImage(id: ObjectId, imageBase64: string): Promise<string> {
  const user = await User.User.findById(id);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }

  const imageUpload = await uploadBase64ImageToCloudinary(
    imageBase64,
    'Nomomic_Users'
  );
  user.profileImage = imageUpload;
  await user.save();
  return imageUpload;
}

/**   Get Comics file Url */

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

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return UserRepo.update(user);
}

/* Update User Details */
async function updateUserDetails(
  id: ObjectId,
  fullName: string,
  gender: string,
  country: string,
  nickName: string,
  language: string
): Promise<IUser> {
  const user = await User.User.findById(id);
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  user.fullName = fullName;
  user.gender = gender;
  user.language = language;
  user.nickName = nickName;
  user.country = country;
  await user.save();
  return user;
}

/** Get user by email in session cookie */
async function getUserByEmail(email: string): Promise<IUser> {
  const user = await User.User.findOne({ email }).select('-password');
  if (!user) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
}
/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  return UserRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  updateUserDetails,
  getUserById,
  uploadImage,
  getComicsFileUrl,
} as const;
