import { getUserPreferences, updateUserPreferences, getReadingHistory } from '../models/userModel.js';

// Get user preferences
export const fetchPreferences = (req, res) => {
  try {
    const userId = req.user.id;
    const prefs = getUserPreferences(userId);
    if (!prefs) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      success: true,
      preferences: {
        interests: JSON.parse(prefs.interests || '[]'),
        preferredLanguage: prefs.preferredLanguage,
        fontSize: prefs.fontSize,
        notifications: JSON.parse(prefs.notifications || '{}')
      }
    });
  } catch (err) {
    console.error('Get Preferences Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch preferences' });
  }
};

// Update user preferences
export const updatePreferences = (req, res) => {
  try {
    const userId = req.user.id;
    const { interests, preferredLanguage, fontSize, notifications } = req.body;

    updateUserPreferences({ userId, interests, preferredLanguage, fontSize, notifications });

    res.json({ success: true, message: 'Preferences updated' });
  } catch (err) {
    console.error('Update Preferences Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update preferences' });
  }
};

// Get reading history
export const fetchReadingHistory = (req, res) => {
  try {
    const userId = req.user.id;
    const history = getReadingHistory(userId);

    res.json({ success: true, history });
  } catch (err) {
    console.error('Get Reading History Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch reading history' });
  }
};
