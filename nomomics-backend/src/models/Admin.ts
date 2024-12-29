import mongoose, { Schema, ObjectId, Document } from 'mongoose';

export interface IAdmin extends Document {
	email: string;
	password: string;
	role: string;
	fullName: string;
	phoneNumber: string;
	username: string;
	profileImage: string;
	isVerified: boolean;
	gender?: string;
	dateOfBirth?: string;
	// isSuspended: boolean;
}

const AdminSchema = new Schema<IAdmin>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, required: true },
		fullName: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		gender: { type: String },
		username: { type: String, required: true },
		profileImage: { type: String, required: true },
		isVerified: { type: Boolean, required: true },
		dateOfBirth: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export interface ISessionAdmin {
	id: number;
	email: string;
	fullName: string;
	role: string;
}

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
