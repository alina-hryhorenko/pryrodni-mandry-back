import { Router } from 'express';
import {
  getUsers,
  getPopularUsers,
  getCurrentUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/me', authenticate, getCurrentUser);
router.get('/users/popular', getPopularUsers);

export default router;
