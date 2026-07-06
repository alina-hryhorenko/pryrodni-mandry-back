import express from 'express';
import { getStoryById } from '../controllers/storyController.js';

const router = express.Router();


router.get('/:storyId', getStoryById);

export default router;