import db from '../config/database.js';

// Fetch all categories with their subcategories
export const getAllCategories = () => {
  const categories = db.prepare(`
    SELECT id, name, slug FROM categories ORDER BY name ASC
  `).all();

  const subcategories = db.prepare(`
    SELECT id, name, category_id FROM subcategories
  `).all();

  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    subcategories: subcategories
      .filter(sub => sub.category_id === cat.id)
      .map(sub => sub.name)
  }));
};

// Get category by slug
export const getCategoryBySlug = (slug) => {
  return db.prepare(`
    SELECT id, name FROM categories WHERE slug = ?
  `).get(slug);
};

// Get articles for a category (optionally filtered by subcategory)
export const getArticlesByCategory = ({ categoryId, subcategoryName, page = 1, limit = 10 }) => {
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
      s.name AS subcategory,
      au.name AS authorName,
      au.id AS authorId
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN subcategories s ON a.subcategory_id = s.id
    LEFT JOIN article_authors aa ON a.id = aa.article_id
    LEFT JOIN authors au ON aa.author_id = au.id
    WHERE a.category_id = ?
  `;

  const params = [categoryId];

  if (subcategoryName) {
    query += ` AND s.name = ?`;
    params.push(subcategoryName);
  }

  query += ` ORDER BY a.published_date DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const articles = db.prepare(query).all(...params);
  return articles;
};
