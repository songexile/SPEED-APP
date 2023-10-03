import { Schema } from 'mongoose';

export const SubmissionSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  journal: { type: String, required: true },
  year: { type: Number, required: true },
  volume: { type: String, required: false },
  pages: { type: String, required: false },
  doi: { type: String, required: true },
});
