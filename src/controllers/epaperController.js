import { getEpaperEditions } from '../models/epaper.js';

export const fetchEpaperEditions = (req, res) => {
  try {
    const editions = getEpaperEditions();
    res.json({ success: true, editions });
  } catch (err) {
    console.error('Fetch E-Paper Editions Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch e-paper editions' });
  }
};
