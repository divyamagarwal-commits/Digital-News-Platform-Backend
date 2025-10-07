import db from '../config/database.js';

// ---------- COMMENTS ----------

// Post a comment
export const postComment = ({ articleId, userId, comment, parentId = null }) => {
  const stmt = db.prepare(`
    INSERT INTO comments (article_id, user_id, comment, parent_id)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(articleId, userId, comment, parentId);
  return info.lastInsertRowid;
};

// Vote on a comment
export const voteComment = ({ commentId, vote }) => {
  if (vote === 'up') {
    return db.prepare(`UPDATE comments SET upvotes = upvotes + 1 WHERE id = ?`).run(commentId);
  } else if (vote === 'down') {
    return db.prepare(`UPDATE comments SET downvotes = downvotes + 1 WHERE id = ?`).run(commentId);
  } else {
    throw new Error('Invalid vote type');
  }
};

// ---------- BOOKMARKS ----------

// Save article to bookmarks
export const saveBookmark = ({ userId, articleId, collectionId = null }) => {
  return db.prepare(`
    INSERT INTO bookmarks (user_id, article_id, collection_id)
    VALUES (?, ?, ?)
  `).run(userId, articleId, collectionId);
};

// Get user's bookmarks
export const getBookmarks = (userId) => {
  return db.prepare(`
    SELECT b.article_id AS id, a.headline, a.summary, a.featured_image AS imageUrl, a.published_date AS publishedAt
    FROM bookmarks b
    JOIN articles a ON b.article_id = a.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `).all(userId);
};

// Remove bookmark
export const removeBookmark = ({ userId, articleId }) => {
  return db.prepare(`
    DELETE FROM bookmarks
    WHERE user_id = ? AND article_id = ?
  `).run(userId, articleId);
};
