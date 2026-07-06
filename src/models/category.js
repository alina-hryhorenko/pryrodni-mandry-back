import { Schema, model } from "mongoose";
import { CATEGORIES } from "./story.js";

const categorySchema = new Schema(
    {
        category: {
            type: String,
            enum: CATEGORIES,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        img: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

export const Category = model('Category', categorySchema);
