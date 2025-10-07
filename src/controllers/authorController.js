import { getAuthorById, getArticlesByAuthor, followAuthor } from '../models/author.js';

export const getAuthorProfile = (req, res) => {
  try {
    const { id } = req.params;
    const author = getAuthorById(id);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
    res.json({ success: true, author });
  } catch (err) {
    console.error('Get Author Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch author profile' });
  }
};

export const getArticlesForAuthor = (req, res) => {
  try {
    const { id } = req.params;
    const articles = getArticlesByAuthor(id);
    res.json({ success: true, articles });
  } catch (err) {
    console.error('Get Author Articles Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch author articles' });
  }
};

export const followAuthorController = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const followed = followAuthor({ userId, authorId: id });
    res.json({ success: true, message: followed ? 'Author followed' : 'Already following' });
  } catch (err) {
    console.error('Follow Author Error:', err);
    res.status(500).json({ success: false, message: 'Failed to follow author' });
  }
};
