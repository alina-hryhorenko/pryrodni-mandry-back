import { Category } from '../models/category.js';
import { Story } from '../models/story.js';

export const getCategoriesWithCount = async (req, res, next) => {
  try {
    const categories = await Category.find();

    const result = await Promise.all(
      categories.map(async (item) => {
        const count = await Story.countDocuments({
          category: item._id,
        });

        return {
          category: item.category,
          count,
        };
      }),
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
