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
import { upload } from '../middleware/multer.js';

const router = Router();

// GET
router.get('/stories', celebrate(getAllStoriesSchema), getAllStories);
router.get('/stories/popular', getPopularStories);
router.get('/story/:storyId', celebrate(storyIdSchema), getStoryByStoryId);

// POST
router.post(
  '/stories',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);

export default router;
