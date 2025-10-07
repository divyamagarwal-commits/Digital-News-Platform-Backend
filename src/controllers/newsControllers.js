import { getNewsFeed, getTrendingArticles, getBreakingNews } from '../models/article.js';

export const getFeed = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const { articles, totalPages } = getNewsFeed({ page, limit });

    const formatted = articles.map((a) => ({
      id: a.id,
      headline: a.headline,
      summary: a.summary,
      category: a.category,
      publishedAt: a.publishedAt,
      readTime: '3 min',
      imageUrl: a.imageUrl,
      author: { name: a.authorName, id: a.authorId },
      isPremium: !!a.isPremium,
      viewCount: a.viewCount
    }));

    res.json({ success: true, page, totalPages, articles: formatted });
  } catch (err) {
    console.error('Feed Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch feed' });
  }
};

export const getTrending = (req, res) => {
  try {
    const timeframe = req.query.timeframe || '24h';
    const trending = getTrendingArticles(timeframe);
    res.json({ success: true, trending });
  } catch (err) {
    console.error('Trending Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch trending news' });
  }
};

export const getBreaking = (req, res) => {
  try {
    const breaking = getBreakingNews();
    res.json({ success: true, breaking });
  } catch (err) {
    console.error('Breaking Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch breaking news' });
  }
};
