import db from '../config/database.js';

// Fetch single article with authors, tags, and category
export const getArticleById = (id) => {
  const article = db.prepare(`
    SELECT 
      a.id,
      a.headline,
      a.subheadline,
      a.content,
      a.published_date AS publishedAt,
      a.updated_at AS updatedAt,
      a.featured_image AS imageUrl,
      a.image_caption AS imageCaption,
      a.view_count AS viewCount,
      a.is_premium AS isPremium,
      c.name AS category,
      s.name AS subcategory
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN subcategories s ON a.subcategory_id = s.id
    WHERE a.id = ?
  `).get(id);

  if (!article) return null;

  // Authors
  const authors = db.prepare(`
    SELECT 
      au.id,
      au.name,
      au.designation,
      au.profile_image AS profileImage
    FROM article_authors aa
    JOIN authors au ON aa.author_id = au.id
    WHERE aa.article_id = ?
  `).all(id);

  // Tags
  const tags = db.prepare(`
    SELECT t.name 
    FROM article_tags at
    JOIN tags t ON at.tag_id = t.id
    WHERE at.article_id = ?
  `).all(id).map(t => t.name);

  // Related articles (same category)
  const related = db.prepare(`
    SELECT 
      id,
      headline,
      featured_image AS imageUrl,
      published_date AS publishedAt
    FROM articles
    WHERE category_id = (SELECT category_id FROM articles WHERE id = ?)
      AND id != ?
    ORDER BY published_date DESC
    LIMIT 5
  `).all(id, id);

  return { ...article, authors, tags, relatedArticles: related };
};

// Increment article view count
export const incrementViewCount = (id) => {
  return db.prepare(`
    UPDATE articles SET view_count = view_count + 1 WHERE id = ?
  `).run(id);
};
