import express from 'express';
import { getCategories, getArticlesForCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug/articles', getArticlesForCategory);

export default router;
