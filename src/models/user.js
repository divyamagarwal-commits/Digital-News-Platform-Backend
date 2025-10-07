import db from '../config/database.js';

export const createUser = ({ name, email, passwordHash, phone, interests }) => {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, preferences)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(name, email, passwordHash, JSON.stringify({ interests }));
  return { id: info.lastInsertRowid, name, email };
};

export const findUserByEmail = (email) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ? LIMIT 1`);
  return stmt.get(email);
};

export const findUserById = (id) => {
  const stmt = db.prepare(`SELECT id, name, email, subscription_status FROM users WHERE id = ?`);
  return stmt.get(id);
};
