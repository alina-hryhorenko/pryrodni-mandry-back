import { Router } from 'express';
import { getPopularUsers } from '../controllers/userController.js';

const router = Router();

router.get('/users/popular', getPopularUsers);

export default router;
