import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import User from '@src/models/User';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { ObjectId } from 'mongoose';

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  // const user = check.isValid(req.body, 'user', User.User.isUser);
  // await UserService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  // const user = check.isValid(req.body, 'user', User.isUser);
  // await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/* Update User Details */

async function updateUserDetails(req: IReq, res: IRes) {
  const [
    fullName,
    nickName,
    gender,
    country,
    language,
    dob,
    phoneNumber,
    location,
  ] = check.isStr(req.body, [
    'fullName',
    'nickName',
    'gender',
    'country',
    'language',
  ]);
  const updatedUser = await UserService.updateUserDetails(
    req.body.id as ObjectId,
    fullName,
    gender,
    country,
    nickName,
    language,
    dob,
    phoneNumber,
    location
  );

  // Convert Mongoose document to a plain object
  const safeUserUpdate = updatedUser.toObject
    ? updatedUser.toObject()
    : updatedUser;

  // Remove sensitive and unnecessary fields
  const {
    password,
    verificationToken,
    loginAttempts,
    isAccountVerified,
    isAccoutLocked,
    ...filteredUser
  } = safeUserUpdate;

  return res
    .status(HttpStatusCodes.OK)
    .json({ success: true, data: { user: filteredUser } });
}

/** Get Comics file Url */
async function getComicsFileUrl(req: IReq, res: IRes) {
  const [base64File] = check.isStr(req.body, ['base64File']);
  const comicsUrl = await UserService.getComicsFileUrl(
    req.body.id as ObjectId,
    base64File
  );
  return res
    .status(HttpStatusCodes.OK)
    .json({ success: true, data: { comicsUrl } });
}

/** Upload Image */
async function uploadImage(req: IReq, res: IRes) {
  const [base64Image] = check.isStr(req.body, ['base64Image']);
  const imageUrl = await UserService.uploadImage(
    req.body.id as ObjectId,
    base64Image
  );
  return res
    .status(HttpStatusCodes.OK)
    .json({ success: true, data: { imageUrl } });
}

/** Get User */
async function getUser(req: IReq, res: IRes) {
  // const {id} = req.user
  const user = await UserService.getUserById(req.body.id as ObjectId);
  return res.status(HttpStatusCodes.OK).json({ success: true, data: { user } });
}

/** Upload Image */
/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = check.isNum(req.params, 'id');
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
  updateUserDetails,
  getComicsFileUrl,
  uploadImage,
  getUser,
} as const;
