import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllUsers,
  getCurrentUser,
  saveStory,
  unsaveStory,
  getUserByID,
  getCurrentUserStories,
  getSavedStories,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

import {
  commonQuerySchema,
  getUserByIdSchema,
} from '../validations/usersValidation.js';
import {
  storyIdBodySchema,
  storyIdSchema,
} from '../validations/storiesValidation.js';

const router = Router();

router.get('/users', celebrate(commonQuerySchema), getAllUsers);
router.get('/users/me', authenticate, getCurrentUser);

router.get(
  '/users/my-stories',
  authenticate,
  celebrate(commonQuerySchema),
  getCurrentUserStories,
);
router.get(
  '/users/saved-stories',
  authenticate,
  celebrate(commonQuerySchema),
  getSavedStories,
);
router.get('/users/:userId', celebrate(getUserByIdSchema), getUserByID);

router.post(
  '/users/save',
  authenticate,
  celebrate(storyIdBodySchema),
  saveStory,
);
router.delete(
  '/users/save/:storyId',
  authenticate,
  celebrate(storyIdSchema),
  unsaveStory,
);

export default router;
