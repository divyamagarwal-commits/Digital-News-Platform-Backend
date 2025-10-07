import { searchArticles } from '../models/search.js';

export const search = (req, res) => {
  try {
    const { q, category, dateFrom, dateTo, author, page, limit } = req.query;

    const { articles, totalResults } = searchArticles({
      q,
      category,
      dateFrom,
      dateTo,
      author,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    });

    res.json({
      success: true,
      query: q || '',
      totalResults,
      articles
    });
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ success: false, message: 'Failed to search articles' });
  }
};
