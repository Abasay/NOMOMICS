import { model, ObjectId, Schema, Types } from 'mongoose';

interface IComics extends Document {
  comics: {
    title: string;
    author: string;
    reviews: ObjectId;
    comments: ObjectId;
  };
  owner: ObjectId;
}

const ComicsSchema = new Schema<IComics>(
  {
    owner: {
      type: Types.ObjectId,
      ref: 'User',
    },
    comics: {
      title: {
        type: String,
      },
      author: {
        type: String,
      },
      reviews: {
        type: Types.ObjectId,
        ref: 'Review',
        default: null,
      },
      comments: {
        type: Types.ObjectId,
        ref: 'Comment',
        default: null,
      },
    },
  },
  { timestamps: true }
);

export default model<IComics>('Comics', ComicsSchema);
