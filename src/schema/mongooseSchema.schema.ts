import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  message_type: String,
  fields: Array,
});
