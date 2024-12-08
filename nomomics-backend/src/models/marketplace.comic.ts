import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IComicMarket extends Document {
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
    episodeNumber: number;
    episodeTitle: string;
    // episodeDescription: string;
    episodeFileUrl: string[];
    episodeCoverImage: string;
    dateUploaded?: Date;
    filesType: string;
  }[];
  price: number;
  paidBy: ObjectId[];
}

const MarketComicSchema = new Schema<IComicMarket>(
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
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    episodes: [
      {
        episodeNumber: { type: Number, required: true },
        episodeTitle: { type: String, required: true },
        episodeFileUrl: [{ type: String, required: true }],
        episodeCoverImage: { type: String, required: true },
        dateUploaded: { type: Date, default: Date.now },
        filesType: { type: String, required: true },
      },
    ],
    price: { type: Number, required: true },
    paidBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const ComicMarket = model<IComicMarket>('MarketComic', MarketComicSchema);

export default ComicMarket;
