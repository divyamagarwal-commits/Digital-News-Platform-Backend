import express from 'express';
import { fetchActivePolls, voteInPoll } from '../controllers/pollController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/active', fetchActivePolls);
router.post('/:id/vote', authenticateToken, voteInPoll);

export default router;
