import { Document, Schema, model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
};

export const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = model<IBook>('Book', BookSchema);
export default Book;