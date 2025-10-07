import express from 'express';
import { fetchEpaperEditions } from '../controllers/epaperController.js';

const router = express.Router();

router.get('/editions', fetchEpaperEditions);

export default router;
