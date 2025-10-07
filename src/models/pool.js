import db from '../config/database.js';

// Fetch active polls
export const getActivePolls = (userId) => {
  const polls = db.prepare(`
    SELECT id, question
    FROM polls
    WHERE is_active = 1
    ORDER BY created_at DESC
  `).all();

  return polls.map(poll => {
    const options = db.prepare(`
      SELECT id, text, COUNT(pv.id) AS votes
      FROM poll_options po
      LEFT JOIN poll_votes pv ON po.id = pv.option_id
      WHERE po.poll_id = ?
      GROUP BY po.id
    `).all(poll.id);

    const totalVotes = options.reduce((sum, o) => sum + o.votes, 0) || 0;

    const formattedOptions = options.map(o => ({
      id: o.id,
      text: o.text,
      percentage: totalVotes ? Math.round((o.votes / totalVotes) * 100) : 0
    }));

    const hasVoted = db.prepare(`
      SELECT 1 FROM poll_votes WHERE poll_id = ? AND user_id = ?
    `).get(poll.id, userId) ? true : false;

    return {
      id: poll.id,
      question: poll.question,
      options: formattedOptions,
      totalVotes,
      hasVoted
    };
  });
};

// Vote in a poll
export const votePoll = ({ pollId, optionId, userId }) => {
  // Check if already voted
  const existingVote = db.prepare(`
    SELECT 1 FROM poll_votes WHERE poll_id = ? AND user_id = ?
  `).get(pollId, userId);

  if (existingVote) throw new Error('User has already voted');

  db.prepare(`
    INSERT INTO poll_votes (poll_id, option_id, user_id, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `).run(pollId, optionId, userId);

  return true;
};
