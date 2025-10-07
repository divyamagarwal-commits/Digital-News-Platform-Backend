import db from '../config/database.js';

// ---------- PREFERENCES ----------

// Get user preferences
export const getUserPreferences = (userId) => {
  return db.prepare(`
    SELECT interests, preferred_language AS preferredLanguage,
           font_size AS fontSize,
           notifications
    FROM users
    WHERE id = ?
  `).get(userId);
};

// Update user preferences
export const updateUserPreferences = ({ userId, interests, preferredLanguage, fontSize, notifications }) => {
  return db.prepare(`
    UPDATE users
    SET interests = ?,
        preferred_language = ?,
        font_size = ?,
        notifications = ?
    WHERE id = ?
  `).run(
    JSON.stringify(interests),
    preferredLanguage,
    fontSize,
    JSON.stringify(notifications),
    userId
  );
};

// ---------- READING HISTORY ----------

// Get reading history
export const getReadingHistory = (userId, limit = 20) => {
  return db.prepare(`
    SELECT rh.article_id AS id,
           a.headline,
           a.summary,
           a.featured_image AS imageUrl,
           rh.read_duration AS readTime,
           rh.created_at AS readAt
    FROM reading_history rh
    JOIN articles a ON rh.article_id = a.id
    WHERE rh.user_id = ?
    ORDER BY rh.created_at DESC
    LIMIT ?
  `).all(userId, limit);
};
