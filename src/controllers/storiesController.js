import { Story } from '../models/story.js';

export const getAllStories = async (req, res) => {
  const { page = 1, limit = 9, category, sort } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  const pipeline = [];
  //фільтрація по категоріях
  if (category) {
    pipeline.push({ $match: filter });
  }
  //сортування за нові\популярні
  if (sort === 'new') {
    pipeline.push({ $sort: { createdAt: -1 } });
  }
  if (sort === 'popular') {
    pipeline.push({ $sort: { likes: -1 } });
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
};

export const getPopularStories = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const stories = await Story.find()
      .sort({ rate: -1 })
      .limit(limit)
      .populate('ownerId', 'name avatarURL');

    const result = stories.map((story) => ({
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
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getStoryByStoryId = async (req, res) => {
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
    return res.status(500).json({
      message: 'Помилка сервера',
      error: error.message,
    });
  }
};

export const getStoryByUserId = (req, res) => {
  res.res(200).json();
};

// export const getStoryByCategory = (req, res) => {
//     return res.status(200).json();
// }

export const createStory = (req, res) => {
  res.res(200).json();
};
