import { Schema, model } from "mongoose";

const articleScheme = new Schema(
    {
        image: {

        },
        header: {

        },
        category: {

        },
        mainText: {

        }
    },
    { 
        timestamps: true,
    }
)

export const Article = model('Article', articleScheme);