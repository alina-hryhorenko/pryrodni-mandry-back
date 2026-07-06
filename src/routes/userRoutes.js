import { Router } from 'express';
import { getUsers, getPopularUsers } from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users/popular', getPopularUsers);

export default router;
