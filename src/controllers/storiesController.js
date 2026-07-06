import { Story } from '../models/story.js';

export const getAllStories = (req, res) => {
    const { page = 1, limit = 10, category } = req.query;

    return res.status(200).json();
};

export const getPopularStories = (req, res) => {
    return res.status(200).json();
};

export const getStoryByStoryId = async (req, res) => {
    try {
        const { storyId } = req.params;

        const story = await Story.findById(storyId)
            .populate('author'); 

        if (!story) {
            return res.status(404).json({
                message: 'Story not found',
            });
        }

        return res.status(200).json(story);

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

export const getStoryByUserId = (req, res) => {
    return res.status(200).json();
};

// export const getStoryByCategory = (req, res) => {
//     return res.status(200).json();
// }

export const createStory = (req, res) => {
    return res.status(200).json();
};