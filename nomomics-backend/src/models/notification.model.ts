import mongoose, { Schema, Document, Types } from 'mongoose';

interface INotification extends Document {
	creatorId: Schema.Types.ObjectId; // Creator receiving the notification
	type:
		| 'NEW_FOLLOWER'
		| 'NEW_COMMENT'
		| 'NEW_LIKE'
		| 'COMIC_PUBLISHED'
		| 'SYSTEM_ALERT'; // Type of notification
	message: string; // Notification message
	comicId?: Types.ObjectId; // Optional: Related comic ID
	fromUserId?: Types.ObjectId; // Optional: ID of the user triggering the notification
	isRead: boolean; // Status of the notification
	createdAt: Date; // Timestamp of creation
}

const notificationSchema = new Schema<INotification>(
	{
		creatorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}, // Creator receiving the notification
		type: {
			type: String,
			enum: [
				'NEW_FOLLOWER',
				'NEW_COMMENT',
				'NEW_LIKE',
				'COMIC_PUBLISHED',
				'SYSTEM_ALERT',
				'NEW_COMIC',
			],
			required: true,
		},
		message: { type: String, required: true }, // Notification message
		comicId: { type: Types.ObjectId, ref: 'Comic' }, // Related comic, if applicable
		fromUserId: { type: Types.ObjectId, ref: 'User' }, // User who triggered the notification
		isRead: { type: Boolean, default: false }, // Read status
	},
	{ timestamps: true }
);

export default mongoose.model<INotification>(
	'Notification',
	notificationSchema
);
