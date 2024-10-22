import { ref } from 'joi';
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAlert extends Document {
    message: string;
    type: string;
    user: Types.ObjectId;
    status: string;
}

const AlertSchema: Schema = new Schema({
    message: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true, default: 'Unresolved' }
}, {
    timestamps: true
})

export const Alert = mongoose.model<IAlert>('Alert', AlertSchema);