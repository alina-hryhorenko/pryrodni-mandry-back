import { Router } from 'express'
import { 
    getAllStories, 
    getPopularStories, 
    getStoryByStoryId,
    getStoryByUserId,
    createStory
} from '../controllers/storiesController';

const router = Router();

// GET
router.get('/stories', getAllStories);
router.get('/stories/popular', getPopularStories);
router.get('/story/:storyId', getStoryByStoryId);
router.get('/stories/:userId', getStoryByUserId);

// POST
router.post('/stories', createStory);

export default router;