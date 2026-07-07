import { Router } from 'express';
import { getCategoriesWithCount } from '../controllers/categoriesController.js';

const router = Router();

// GET
router.get('/categories', getCategoriesWithCount);

export default router;
