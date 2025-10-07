import express from 'express';
import { getFeed, getTrending, getBreaking } from '../controllers/newsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Only authenticated users get personalized feed
router.get('/feed', authenticateToken, getFeed);
router.get('/trending', getTrending);
router.get('/breaking', getBreaking);

export default router;
