import db from '../config/database.js';

// ---------- Notification Settings ----------

// Get notification settings for a user
export const getNotificationSettings = (userId) => {
  const settings = db.prepare(`
    SELECT notifications
    FROM users
    WHERE id = ?
  `).get(userId);

  if (!settings) return null;

  return JSON.parse(settings.notifications || '{}');
};

// Update notification settings for a user
export const updateNotificationSettings = ({ userId, notifications }) => {
  return db.prepare(`
    UPDATE users
    SET notifications = ?
    WHERE id = ?
  `).run(JSON.stringify(notifications), userId);
};

// ---------- Device Registration ----------

// Register device for push notifications
export const registerDevice = ({ userId, deviceToken, platform }) => {
  // Check if device already exists
  const exists = db.prepare(`
    SELECT 1 FROM user_devices
    WHERE user_id = ? AND device_token = ?
  `).get(userId, deviceToken);

  if (!exists) {
    db.prepare(`
      INSERT INTO user_devices (user_id, device_token, platform, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `).run(userId, deviceToken, platform);
  }
};
