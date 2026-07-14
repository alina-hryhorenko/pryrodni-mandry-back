import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/tags.js';

// Валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(9).default(9),
    category: Joi.string().custom(objectIdValidator),
    sort: Joi.string().valid('new', 'popular'),
  }),
};

// Схема для перевірки параметра storyId
export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};
export const storyIdBodySchema = {
  [Segments.BODY]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().required(),
    category: Joi.string().custom(objectIdValidator).required(),
    article: Joi.string().trim().required(),
  }),
};
