import mongoose, { Schema, Types } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IFollower extends Document {
	comicId: ObjectId;
	userId: ObjectId;
	authorId: ObjectId;
	followedAt: Date;
}

const followerSchema = new Schema<IFollower>(
	{
		comicId: { type: Types.ObjectId, ref: 'Comic', required: true },
		userId: { type: Types.ObjectId, ref: 'User', required: true }, // User following the comic
		authorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		followedAt: { type: Date, default: Date.now }, // Timestamp when the user followed
	},
	{ timestamps: true }
);

followerSchema.index({ comicId: 1, userId: 1 }, { unique: true }); // Prevent duplicate follows

export default mongoose.model('Follower', followerSchema);
