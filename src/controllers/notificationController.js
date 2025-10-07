import { getNotificationSettings, updateNotificationSettings, registerDevice } from '../models/notification.js';

// GET /settings
export const fetchSettings = (req, res) => {
  try {
    const userId = req.user.id;
    const settings = getNotificationSettings(userId);
    res.json({ success: true, notifications: settings || {} });
  } catch (err) {
    console.error('Get Notification Settings Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch notification settings' });
  }
};

// PUT /settings
export const updateSettings = (req, res) => {
  try {
    const userId = req.user.id;
    const { notifications } = req.body;

    updateNotificationSettings({ userId, notifications });
    res.json({ success: true, message: 'Notification settings updated' });
  } catch (err) {
    console.error('Update Notification Settings Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update notification settings' });
  }
};

// POST /register-device
export const registerDeviceController = (req, res) => {
  try {
    const userId = req.user.id;
    const { deviceToken, platform } = req.body;

    registerDevice({ userId, deviceToken, platform });
    res.json({ success: true, message: 'Device registered successfully' });
  } catch (err) {
    console.error('Register Device Error:', err);
    res.status(500).json({ success: false, message: 'Failed to register device' });
  }
};
