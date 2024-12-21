import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IComment extends Document {
	comicId: ObjectId; // Reference to the comic
	episodeId: string;
	userId: ObjectId; // Reference to the user who posted the comment
	authorId: ObjectId;
	content: string; // The comment text
	parentCommentId?: ObjectId; // Reference for replies to comments
	likes: { user: ObjectId; date: Date }[]; // Count of likes on the comment
	isDeleted: boolean; // For soft deletion
	createdAt: Date; // Automatic timestamp
	updatedAt: Date; // Automatic timestamp
}

const CommentSchema: Schema = new Schema<IComment>(
	{
		comicId: {
			type: Schema.Types.ObjectId,
			ref: 'Comic',
			required: true,
		},
		episodeId: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		authorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000,
		},
		parentCommentId: {
			type: Schema.Types.ObjectId,
			ref: 'Comment',
			default: null,
		},
		likes: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

// Virtual for nested replies (if needed)
CommentSchema.virtual('replies', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'parentCommentId',
	justOne: false,
});

CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });

// Middleware to prevent empty content on comments
CommentSchema.pre('save', function (next) {
	const comment = this as unknown as IComment;
	if (!comment.content.trim()) {
		next(new Error('Comment content cannot be empty.'));
	} else {
		next();
	}
});
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default {
	Comment,
} as const;
