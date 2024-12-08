import * as ACTIONS from '@src/common/constants';
import { string } from 'joi';
import moment from 'moment';
import mongoose, { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM =
  'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';

export enum UserRoles {
  Standard,
  Admin,
}

// **** Types **** //

export interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  role?: string;
  nickName?: string;
  gender?: string;
  language?: string;
  password: string;
  isAccountVerified: boolean;
  isAccoutLocked: boolean;
  loginAttempts: number;
  isAdult: boolean;
  specialOffers: boolean;
  verificationToken: string;
  country?: string;
  profileImage?: string;
  comics?: Types.ObjectId;
  signupMethod?: string;
  phoneNumber?: string;
  dob?: string;
  location?: string;
  generateJWTVerificationToken: () => Promise<string>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true },
    nickName: { type: String },

    email: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(ACTIONS.USER_ROLES),
      default: 'User',
    },
    isAdult: { type: Boolean, default: false },
    specialOffers: { type: Boolean, default: false },
    password: { type: String },
    isAccountVerified: { type: Boolean, default: false },
    isAccoutLocked: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 3 },
    verificationToken: { type: String, default: '' },
    gender: { type: String },
    language: { type: String },
    country: { type: String },
    profileImage: { type: String },
    comics: {
      type: Types.ObjectId,
      ref: 'Comics',
    },
    signupMethod: { type: String },
    phoneNumber: { type: String },
    dob: { type: String },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateJWTVerificationToken = async function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '1h' }
  );
  user.verificationToken = token;
  await user.save();
  return token;
};

export const User = mongoose.model<IUser>('User', UserSchema);
export interface ISessionUser {
  id: number;
  email: string;
  name: string;
}

export const isUser = (obj: unknown): obj is IUser => {
  const user = obj as IUser;
  return (
    typeof user?.fullName === 'string' &&
    typeof user?.email === 'string' &&
    typeof user?.role === 'string' &&
    typeof user?.password === 'string'
    // typeof user?.address === 'string' &&
    // Array.isArray(user?.diabetes_type) &&
    // typeof user?.note === 'string'
  );
};

// **** Export default **** //

export default {
  User,
  UserRoles,
  INVALID_CONSTRUCTOR_PARAM,
} as const;
