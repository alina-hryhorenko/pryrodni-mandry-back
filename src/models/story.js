import mongoose, { Schema, model } from 'mongoose';

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    article: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

storySchema.index({ rate: -1 });
export const Story = model('Story', storySchema);
