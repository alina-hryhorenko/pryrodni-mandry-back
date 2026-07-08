import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

// Валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const commonQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(9).default(4),
  }),
};

export const getUserByIdSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(9).default(4),
  }),
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
