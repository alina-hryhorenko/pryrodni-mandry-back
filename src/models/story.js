import { Schema, model } from "mongoose";

const CATEGORIES = [
    'routes',
    'eco-tips',
    'nature',
    'culture',
    'local-products'
];

const storySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        image: {
            type: String,
            required: true
        },
        header: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            enum: CATEGORIES,
            required: true
        },
        mainText: {
            type: String,
            required: true
        },
        savesCount: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

storySchema.index({ savesCount: -1 });
export const Story = model('Story', storySchema);
