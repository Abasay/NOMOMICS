import { Schema, model, Document } from 'mongoose';

interface IToken extends Document {
  email: string;
  fullName: string;
  otp: string;
  dateExpire: Date;
  role: string;
}

const TokenSchema: Schema = new Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  otp: { type: String, required: true },
  dateExpire: { type: Date, required: true },
  role: { type: String, required: true },
});

const Token = model<IToken>('Token', TokenSchema);

export default Token;
