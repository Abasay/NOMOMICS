import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface IView extends Document {
	comicId: ObjectId;
	userId: ObjectId;
	authorId: ObjectId;
	episodeId?: ObjectId;
	ipAddress: string;
	viewedAt: Date;
}

const viewSchema = new Schema<IView>(
	{
		comicId: { type: Types.ObjectId, ref: 'Comic', required: true },
		episodeId: {
			type: Types.ObjectId,
			ref: 'Episode',
			required: true,
		},
		userId: { type: Types.ObjectId, ref: 'User', default: null }, // Optional: Can be null for anonymous views
		authorId: { type: Types.ObjectId, ref: 'User', default: null },
		ipAddress: { type: String, default: null }, // Optional: Track unique views based on IP
		viewedAt: { type: Date, default: Date.now }, // Timestamp of the view
	},
	{ timestamps: true }
);

viewSchema.index({ comicId: 1, episodeId: 1, userId: 1 }, { unique: true });

export default mongoose.model('View', viewSchema);
