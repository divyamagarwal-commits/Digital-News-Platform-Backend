import express from 'express';
import { fetchPlans, subscribe, subscriptionStatus } from '../controllers/subscriptionController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/plans', fetchPlans);
router.post('/subscribe', authenticateToken, subscribe);
router.get('/status', authenticateToken, subscriptionStatus);

export default router;
