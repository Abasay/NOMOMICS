import * as ACTIONS from '@src/common/constants';
import { string } from 'joi';
import moment from 'moment';
import mongoose, { Types } from 'mongoose';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
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
  password: string;
  isAccountVerified: boolean;
  isAccoutLocked: boolean;
  loginAttempts: number

}



const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, enum: Object.values(ACTIONS.USER_ROLES) },
  password: { type: String },
  isAccountVerified: { type: Boolean, default: false },
  isAccoutLocked: { type: Boolean, default: false },
  loginAttempts: { type: Number, default: 3 },
});

export const User = mongoose.model<IUser>('User', UserSchema);
export interface ISessionUser {
  id: number;
  email: string;
  name: string;

}




export const isUser = (obj: unknown): obj is IUser => {
  const user = obj as IUser;
  return (
    typeof user?.name === 'string' &&
    typeof user?.email === 'string' &&
    typeof user?.role === 'string' &&
    typeof user?.password === 'string' &&
    typeof user?.address === 'string' &&
    Array.isArray(user?.diabetes_type) &&
    typeof user?.note === 'string'
  );
}



// **** Export default **** //

export default {
  User,
  UserRoles,
  INVALID_CONSTRUCTOR_PARAM,
} as const;
