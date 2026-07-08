import { Router } from 'express';
import {
  getUsers,
  getPopularUsers,
  getCurrentUser,
  saveStory,
  unsaveStory,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { storyIdBodySchema, storyIdSchema } from '../validations/storiesValidation.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/popular', getPopularUsers);

router.post('/users/save', authenticate, celebrate(storyIdBodySchema), saveStory);
router.delete('/users/save/:storyId', authenticate, celebrate(storyIdSchema), unsaveStory);

export default router;