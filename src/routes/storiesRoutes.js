import { Router } from 'express'
import { 
    getAllStories, 
    getPopularStories, 
    getStoriesByCategory, 
    getStoryByStoryId,
    getStoryByUserId
} from '../controllers/storiesController';

const router = Router();

router.get('/stories', getAllStories);
router.get('/stories/popular', getPopularStories);
router.get('/stories/:category', getStoriesByCategory);
router.get('/story/:storyId', getStoryByStoryId);
router.get('/stories/:userId', getStoryByUserId);

export default router;