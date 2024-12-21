import mongoose, { Schema, Document, Types, ObjectId } from 'mongoose';

export interface ILike extends Document {
	userId: Types.ObjectId; // Reference to the User who liked
	episodeId?: string; // Reference to the Comic that was liked
	comicId: Types.ObjectId;
	authorId: ObjectId;
	isLiked: boolean;
	isDisliked: boolean;
	createdAt: Date; // Timestamp for when the like was made
}

const likeSchema = new Schema<ILike>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		episodeId: {
			type: String,
			// required: true
		},
		comicId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comic',
			required: true,
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isLiked: {
			type: Boolean,
			default: false,
		},
		isDisliked: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// Ensure a user can like a specific comic only once
likeSchema.index({ userId: 1, comicId: 1 }, { unique: true });
const Like = mongoose.model<ILike>('Like', likeSchema);
export default Like;
