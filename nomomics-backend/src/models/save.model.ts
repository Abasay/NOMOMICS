import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface ISaved extends Document {
	comicId: ObjectId;
	userId: ObjectId;
	authorId: ObjectId;
	// episodeId?: ObjectId;
	ipAddress: string;
	savedAt: Date;
}

const savedComicSchema = new Schema<ISaved>(
	{
		userId: { type: Types.ObjectId, ref: 'User', required: true }, // User who saved the comic
		comicId: { type: Types.ObjectId, ref: 'Comic', required: true }, // Saved comic
		savedAt: { type: Date, default: Date.now }, // Timestamp for when the comic was saved
		authorId: { type: Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

// Prevent duplicate saves (one user cannot save the same comic multiple times)
savedComicSchema.index({ userId: 1, comicId: 1 }, { unique: true });

export default mongoose.model('SavedComic', savedComicSchema);
