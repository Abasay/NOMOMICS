import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IComic extends Document {
	// fileUrl: string;
	title: string;
	subTitle: string;
	description: string;
	author: string;
	synopsis: string;
	genre: string;
	category: string;
	ageLimit: boolean;
	location: string;
	coverImage: string;
	owner: ObjectId;
	episodes: {
		_id: ObjectId;
		episodeNumber: number;
		episodeTitle: string;
		// episodeDescription: string;
		episodeFileUrl: string[];
		episodeCoverImage: string;
		dateUploaded?: Date;
		filesType: string;
		episodeId: string;
		isApproved: boolean;
	}[];
}

const ComicSchema = new Schema<IComic>(
	{
		title: { type: String, required: true },
		subTitle: { type: String, required: true },
		description: { type: String, required: true },
		author: { type: String, required: true },
		synopsis: { type: String, required: true },
		genre: { type: String, required: true },
		category: { type: String, required: true },
		ageLimit: { type: Boolean, required: true },
		location: { type: String, required: true },
		coverImage: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		episodes: [
			{
				episodeNumber: { type: Number, required: true },
				episodeTitle: { type: String, required: true },
				episodeFileUrl: [
					{ type: String, required: true },
				],
				episodeCoverImage: {
					type: String,
					required: true,
				},
				dateUploaded: { type: Date, default: Date.now },
				filesType: { type: String, required: true },
				episodeId: { type: String, required: true },
				isApproved: { type: Boolean, default: false },
			},
		],
	},
	{
		timestamps: true,
	}
);

const Comic = model<IComic>('Comic', ComicSchema);

export default Comic;
