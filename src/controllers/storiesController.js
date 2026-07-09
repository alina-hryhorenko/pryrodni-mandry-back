import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import crypto from 'crypto';
import { Story } from '../models/story.js';
import { saveStoryImageFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllStories = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, sort } = req.query;
    const filter = {};
    if (category) {
      filter.category = new mongoose.Types.ObjectId(category); // Якщо передано категорію, додаємо її до фільтра, конвертуючи рядок у об'єкт ObjectId для MongoDB
    }
    const pipeline = [];
    //фільтрація по категоріях
    if (category) {
      pipeline.push({
        $match: filter,
      });
    }
    //сортування за нові\популярні
    if (sort === 'new') {
      pipeline.push({ $sort: { createdAt: -1 } });
    }
    if (sort === 'popular') {
      pipeline.push({ $sort: { rate: -1 } });
    }
    //пагінація
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });

    //Підключення populate для отримання даних автора. стаття і інформація про автора
    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorData',
      },
    });
    pipeline.push({ $unwind: '$authorData' });
    //агрегація
    const stories = await Story.aggregate(pipeline);
    //кількість сторінок
    const match = {};

    if (category) {
      match.category = category;
    }
    const totalStories = await Story.countDocuments(match);
    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({ page, limit, stories, totalPages, totalStories });
  } catch (error) {
    next(error);
  }
};

export const getPopularStories = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const stories = await Story.find()
      .sort({ rate: -1 })
      .limit(limit)
      .populate('ownerId', 'name avatarURL');

    // Відфільтровуємо історії, залишаючи лише ті, у яких автор існує (не є null)
    const validStories = stories.filter((story) => story.ownerId !== null);

    const result = validStories.map((story) => ({
      _id: story._id,
      title: story.title,
      img: story.img,
      savedBySize: story.rate,
      author: {
        _id: story.ownerId._id,
        name: story.ownerId.name,
        avatarURL: story.ownerId.avatarURL,
      },
    }));

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getStoryByStoryId = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId).populate('ownerId');

    if (!story) {
      return res.status(404).json({
        message: 'Така історія відсутня',
      });
    }

    return res.status(200).json(story);
  } catch (error) {
    next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'Story image is required');
    }

    const { title, category, article } = req.body;

    const uploadResult = await saveStoryImageFileToCloudinary(
      req.file.buffer,
      crypto.randomUUID(),
    );

    const story = await Story.create({
      img: uploadResult.secure_url,
      title,
      category,
      article,
      ownerId: req.user._id,
    });
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
};
