import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Story } from '../models/story.js';

export const getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, totalItems] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularUsers = async (req, res) => {
  const popularUsersQuery = User.find();

  popularUsersQuery.where('articlesAmount').gt(0);

  const popularUsers = await popularUsersQuery
    .sort({ articlesAmount: -1 })
    .limit(12);

  res.status(200).json({ popularUsers });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

export const saveStory = async (req, res) => {
  try {
    const { storyId } = req.body;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        status: 'error',
        message: 'Така історія відсутня',
      });
    }

    const user = await User.findById(req.user._id);
    if (user.savedArticles.includes(storyId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Історія вже збережена',
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedArticles: storyId },
    });

    await Story.findByIdAndUpdate(storyId, {
      $inc: { rate: 1 },
    });

    res.status(200).json({
      status: 'success',
      message: 'Історію збережено',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Помилка сервера',
      error: error.message,
    });
  }
};

export const unsaveStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedArticles: storyId },
    });

    await Story.findByIdAndUpdate(storyId, {
      $inc: { rate: -1 },
    });

    res.status(200).json({
      status: 'success',
      message: 'Історію видалено зі збережених',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Помилка сервера',
      error: error.message,
    });
  }
};

export const getUserByID = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 4 } = req.query;

    const user = await User.findById(userId).select(
      'name avatarUrl articlesAmount',
    );

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const skip = (Number(page) - 1) * Number(limit);

    const stories = await Story.find({ ownerId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalStories = user.articlesAmount;
    const totalPages = Math.ceil(totalStories / Number(limit));

    res.status(200).json({
      user,
      stories,
      page: Number(page),
      limit: Number(limit),
      totalStories,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
