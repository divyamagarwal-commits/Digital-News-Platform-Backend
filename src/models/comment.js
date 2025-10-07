import db from '../config/database.js';

export const getCommentsByArticleId = (articleId) => {
  const comments = db.prepare(`
    SELECT 
      c.id,
      c.user_id,
      u.name AS userName,
      u.avatar_url AS userAvatar,
      c.comment,
      c.created_at AS timestamp,
      c.upvotes,
      c.downvotes,
      c.parent_id
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.article_id = ?
    ORDER BY c.created_at ASC
  `).all(articleId);

  // Group replies under parent comments
  const map = {};
  const roots = [];

  for (const c of comments) {
    const comment = {
      id: c.id,
      user: { name: c.userName, avatar: c.userAvatar },
      comment: c.comment,
      timestamp: c.timestamp,
      upvotes: c.upvotes,
      downvotes: c.downvotes,
      replies: []
    };
    map[c.id] = comment;

    if (c.parent_id) {
      if (map[c.parent_id]) {
        map[c.parent_id].replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  }

  return roots;
};
