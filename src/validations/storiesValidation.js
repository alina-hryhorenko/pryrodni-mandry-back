import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/tags.js';

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(9),
    category: Joi.string().valid(...CATEGORIES),
    sort: Joi.string().valid('new', 'popular'),
  }),
};

// Валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

// Схема для перевірки параметра storyId
export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    img: Joi.string().required(),
    title: Joi.string().trim().required(),
    category: Joi.string().valid(...CATEGORIES).required(),
    article: Joi.string().trim().required(),
    rate: Joi.number(),
  }),
};

