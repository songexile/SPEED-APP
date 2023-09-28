import { Schema, Document } from 'mongoose';

export interface Submission extends Document {
  title: string;
  authors: string;
  journal: string;
  year: string;
  volume?: string;
  pages?: string;
  doi: string;
}

export const SubmissionSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  journal: { type: String, required: true },
  year: { type: String, required: true },
  volume: { type: String, required: false },
  pages: { type: String, required: false },
  doi: { type: String, required: true },
});
