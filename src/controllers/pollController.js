import { getActivePolls, votePoll } from '../models/poll.js';

export const fetchActivePolls = (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const polls = getActivePolls(userId);
    res.json({ success: true, polls });
  } catch (err) {
    console.error('Fetch Polls Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch polls' });
  }
};

export const voteInPoll = (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { optionId } = req.body;

    votePoll({ pollId: id, optionId, userId });

    res.json({ success: true, message: 'Vote recorded' });
  } catch (err) {
    console.error('Vote Poll Error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};
