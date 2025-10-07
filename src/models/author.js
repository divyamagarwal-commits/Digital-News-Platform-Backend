import db from '../config/database.js';

// Fetch author profile by ID
export const getAuthorById = (id) => {
  const author = db.prepare(`
    SELECT 
      id,
      name,
      designation,
      bio,
      profile_image AS profileImage,
      email,
      twitter
    FROM authors
    WHERE id = ?
  `).get(id);

  if (!author) return null;

  // Total articles
  const totalArticles = db.prepare(`SELECT COUNT(*) AS count FROM article_authors WHERE author_id = ?`).get(id).count;

  // Followers
  const followers = db.prepare(`SELECT COUNT(*) AS count FROM author_followers WHERE author_id = ?`).get(id).count;

  return { ...author, totalArticles, followers };
};

// Fetch articles by author
export const getArticlesByAuthor = (authorId) => {
  return db.prepare(`
    SELECT 
      a.id,
      a.headline,
      a.summary,
      a.featured_image AS imageUrl,
      a.published_date AS publishedAt,
      a.is_premium AS isPremium,
      a.view_count AS viewCount
    FROM articles a
    JOIN article_authors aa ON a.id = aa.article_id
    WHERE aa.author_id = ?
    ORDER BY a.published_date DESC
  `).all(authorId);
};

// Follow an author
export const followAuthor = ({ userId, authorId }) => {
  // Check if already following
  const exists = db.prepare(`SELECT 1 FROM author_followers WHERE user_id = ? AND author_id = ?`).get(userId, authorId);
  if (!exists) {
    db.prepare(`INSERT INTO author_followers (user_id, author_id) VALUES (?, ?)`).run(userId, authorId);
    return true;
  }
  return false;
};
