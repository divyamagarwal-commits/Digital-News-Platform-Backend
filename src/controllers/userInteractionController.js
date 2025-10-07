import {
  postComment,
  voteComment,
  saveBookmark,
  getBookmarks,
  removeBookmark
} from '../models/userInteraction.js';

// ---------- COMMENTS ----------
export const addComment = (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId, comment, parentId } = req.body;
    const commentId = postComment({ articleId, userId, comment, parentId });
    res.json({ success: true, commentId });
  } catch (err) {
    console.error('Post Comment Error:', err);
    res.status(500).json({ success: false, message: 'Failed to post comment' });
  }
};

export const voteOnComment = (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;
    voteComment({ commentId: id, vote });
    res.json({ success: true, message: 'Vote recorded' });
  } catch (err) {
    console.error('Vote Comment Error:', err);
    res.status(500).json({ success: false, message: 'Failed to vote on comment' });
  }
};

// ---------- BOOKMARKS ----------
export const addBookmark = (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId, collectionId } = req.body;
    saveBookmark({ userId, articleId, collectionId });
    res.json({ success: true, message: 'Bookmark saved' });
  } catch (err) {
    console.error('Add Bookmark Error:', err);
    res.status(500).json({ success: false, message: 'Failed to save bookmark' });
  }
};

export const getUserBookmarks = (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = getBookmarks(userId);
    res.json({ success: true, bookmarks });
  } catch (err) {
    console.error('Get Bookmarks Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch bookmarks' });
  }
};

export const deleteBookmark = (req, res) => {
  try {
    const userId = req.user.id;
    const { articleId } = req.params;
    removeBookmark({ userId, articleId });
    res.json({ success: true, message: 'Bookmark removed' });
  } catch (err) {
    console.error('Delete Bookmark Error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove bookmark' });
  }
};
