import { Schema, model } from 'mongoose';
import { CATEGORIES } from '../constants/tags';

const storySchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

storySchema.index({ savesCount: -1 });
export const Story = model('Story', storySchema);
