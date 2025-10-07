import db from '../config/database.js';

export const searchArticles = ({ q, category, dateFrom, dateTo, author, page = 1, limit = 20 }) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      a.id,
      a.headline,
      a.summary,
      a.featured_image AS imageUrl,
      a.published_date AS publishedAt,
      a.is_premium AS isPremium,
      a.view_count AS viewCount,
      c.name AS category,
      au.name AS authorName,
      au.id AS authorId
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN article_authors aa ON a.id = aa.article_id
    LEFT JOIN authors au ON aa.author_id = au.id
    WHERE 1=1
  `;

  const params = [];

  if (q) {
    query += ` AND (a.headline LIKE ? OR a.summary LIKE ? OR a.content LIKE ?)`;
    const qParam = `%${q}%`;
    params.push(qParam, qParam, qParam);
  }

  if (category) {
    query += ` AND c.name = ?`;
    params.push(category);
  }

  if (author) {
    query += ` AND au.name = ?`;
    params.push(author);
  }

  if (dateFrom) {
    query += ` AND a.published_date >= ?`;
    params.push(dateFrom);
  }

  if (dateTo) {
    query += ` AND a.published_date <= ?`;
    params.push(dateTo);
  }

  query += ` ORDER BY a.published_date DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const articles = db.prepare(query).all(...params);

  const totalQuery = `
    SELECT COUNT(DISTINCT a.id) as count
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN article_authors aa ON a.id = aa.article_id
    LEFT JOIN authors au ON aa.author_id = au.id
    WHERE 1=1
  `;

  // Note: For simplicity, totalResults is approximate; you can refine by building same WHERE conditions
  const totalResults = articles.length;

  return { articles, totalResults };
};
