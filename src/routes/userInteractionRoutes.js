import express from 'express';
import {
  addComment,
  voteOnComment,
  addBookmark,
  getUserBookmarks,
  deleteBookmark
} from '../controllers/userInteractionController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Comments
router.post('/comments', authenticateToken, addComment);
router.post('/comments/:id/vote', authenticateToken, voteOnComment);

// Bookmarks
router.post('/bookmarks', authenticateToken, addBookmark);
router.get('/bookmarks', authenticateToken, getUserBookmarks);
router.delete('/bookmarks/:articleId', authenticateToken, deleteBookmark);

export default router;
