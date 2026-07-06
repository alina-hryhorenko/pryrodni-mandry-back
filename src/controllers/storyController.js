

import { Story } from '../models/story.js';

export const getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params;

    
    const story = await Story.findById(storyId)
      .populate('ownerId');

   
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