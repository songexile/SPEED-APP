import { Schema } from 'mongoose';

export const AnalystSchema = new Schema({
  title: { type: String, required: false },
  authors: { type: String, required: false },
  journal: { type: String, required: false },
  year: { type: String, required: false },
  volume: { type: String, required: false },
  pages: { type: String, required: false },
  doi: { type: String, required: false },
  claim: { type: String, required: false },
  method: { type: String, required: false },
  agreeDisagree: { type: String, required: false },
});
