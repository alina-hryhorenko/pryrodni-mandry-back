import { Router } from 'express';
import {
  getAllStories,
  getPopularStories,
  getStoryByStoryId,
  createStory,
} from '../controllers/storiesController.js';
import {
  createStorySchema,
  getAllStoriesSchema,
  storyIdSchema,
} from '../validations/storiesValidation.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// GET
router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.get('/stories/popular', getPopularStories);
router.get('/story/:storyId', celebrate(storyIdSchema), getStoryByStoryId);

// POST
router.post('/stories', authenticate, celebrate(createStorySchema), createStory);

export default router;
