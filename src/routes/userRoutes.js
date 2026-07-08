import { Router } from 'express';
import {
  getUsers,
  getPopularUsers,
  getCurrentUser,
  saveStory,
  unsaveStory,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/popular', getPopularUsers);

router.post('/users/save', authenticate, saveStory);
router.delete('/users/save/:storyId', authenticate, unsaveStory);

export default router;
