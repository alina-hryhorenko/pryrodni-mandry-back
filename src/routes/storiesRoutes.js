import { Router } from 'express';
import {
  getAllStories,
  getPopularStories,
  getStoryByStoryId,
  getStoryByUserId,
  createStory,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  getAllStoriesSchema,
  storyIdSchema,
} from '../validations/storiesValidation.js';

import { celebrate } from 'celebrate';

const router = Router();

// GET
router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.get('/stories/popular', getPopularStories);
router.get('/story/:storyId', celebrate(storyIdSchema), getStoryByStoryId);
router.get('/stories/:userId', getStoryByUserId);

// POST
router.post('/stories', celebrate(createStorySchema), createStory);

export default router;
