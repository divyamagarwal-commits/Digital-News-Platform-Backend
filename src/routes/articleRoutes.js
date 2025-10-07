import express from 'express';
import { getArticle, trackArticleView, getArticleComments } from '../controllers/articleController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getArticle);
router.post('/:id/view', authenticateToken, trackArticleView);
router.get('/:id/comments', getArticleComments);

export default router;
