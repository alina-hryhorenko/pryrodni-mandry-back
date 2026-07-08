import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsers,
  getPopularUsers,
  saveStory,
  unsaveStory,
} from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/popular', getPopularUsers);

router.post('/users/save', authenticate, saveStory);
router.delete('/users/save/:storyId', authenticate, unsaveStory);

export default router;
