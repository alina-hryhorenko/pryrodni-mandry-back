import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import { saveAvatarFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllUsers = async (req, res, next) => {
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

export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

export const saveStory = async (req, res, next) => {
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
    next(error);
  }
};

export const unsaveStory = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    const user = await User.findById(req.user._id);

    // Якщо історії НЕМАЄ в масиві збережених — повертаємо помилку і зупиняємо процес
    if (!user.savedArticles.includes(storyId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Ця історія не була збережена вами',
      });
    }

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
    next(error);
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

    const [stories, totalStories] = await Promise.all([
      Story.find({ ownerId: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Story.countDocuments({ ownerId: userId }), // Рахуємо актуальну кількість
    ]);

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

export const getCurrentUserStories = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 4 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const stories = await Story.find({ ownerId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalStories = await Story.countDocuments({ ownerId: userId });
    const totalPages = Math.ceil(totalStories / Number(limit));

    res.status(200).json({
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

export const getSavedStories = async (req, res, next) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const savedStories = await Story.find({ _id: req.user.savedArticles })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    if (!savedStories)
      return res.status(404).json({
        status: 'error',
        message: 'Збережені історії відсутні',
      });

    const totalSavedStories = await Story.countDocuments({
      _id: req.user.savedArticles,
    });
    const totalPages = Math.ceil(totalSavedStories / Number(limit));

    res.status(200).json({
      savedStories,
      page: Number(page),
      limit: Number(limit),
      totalSavedStories,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'Avatar file is required');
    }

    const uploadResult = await saveAvatarFileToCloudinary(
      req.file.buffer,
      req.user._id,
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: uploadResult.secure_url },
      { new: true },
    ).select('-password');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
