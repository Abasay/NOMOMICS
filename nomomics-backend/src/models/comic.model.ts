import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IComic extends Document {
  fileUrl: string;
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
  // episodes:{
  //   episodeNumber: number;
  //   episodeTitle: string;
  //   episodeDescription: string;
  //   episodeFileUrl: string;
  // }[]
}

const ComicSchema = new Schema<IComic>(
  {
    fileUrl: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String, required: true },
    ageLimit: { type: Boolean, required: true },
    location: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comic = model<IComic>('Comic', ComicSchema);

export default Comic;
