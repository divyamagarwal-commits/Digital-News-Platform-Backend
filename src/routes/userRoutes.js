import express from 'express';
import { fetchPreferences, updatePreferences, fetchReadingHistory } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Preferences
router.get('/preferences', authenticateToken, fetchPreferences);
router.put('/preferences', authenticateToken, updatePreferences);

// Reading history
router.get('/history', authenticateToken, fetchReadingHistory);

export default router;
