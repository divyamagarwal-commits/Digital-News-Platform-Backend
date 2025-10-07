import express from 'express';
import { getAuthorProfile, getArticlesForAuthor, followAuthorController } from '../controllers/authorController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getAuthorProfile);
router.get('/:id/articles', getArticlesForAuthor);
router.post('/:id/follow', authenticateToken, followAuthorController);

export default router;
