import { getArticleById, incrementViewCount } from '../models/article.js';
import { getCommentsByArticleId } from '../models/comment.js';

export const getArticle = (req, res) => {
  try {
    const { id } = req.params;
    const article = getArticleById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.json({ success: true, article });
  } catch (err) {
    console.error('Error fetching article:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch article' });
  }
};

export const trackArticleView = (req, res) => {
  try {
    const { id } = req.params;
    incrementViewCount(id);
    res.json({ success: true, message: 'View count updated' });
  } catch (err) {
    console.error('Error updating views:', err);
    res.status(500).json({ success: false, message: 'Failed to update views' });
  }
};

export const getArticleComments = (req, res) => {
  try {
    const { id } = req.params;
    const comments = getCommentsByArticleId(id);
    res.json({ success: true, comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};
