import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getUsers,
  getPopularUsers,
  getCurrentUser,
  saveStory,
  unsaveStory,
  getUserByID,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsersSchema,
  getUserByIdSchema,
} from '../validations/usersValidation.js';

const router = Router();

router.get('/users', celebrate(getUsersSchema), getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/popular', getPopularUsers);
router.get('/users/:userId', celebrate(getUserByIdSchema), getUserByID);

router.post('/users/save', authenticate, saveStory);
router.delete('/users/save/:storyId', authenticate, unsaveStory);

export default router;
