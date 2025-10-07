import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('database/news_platform.db');
const schemaPath = path.resolve('database/schema.sql');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// Connect to SQLite
const db = new Database(dbPath);
console.log('✅ Connected to SQLite database:', dbPath);

// Apply schema if tables don't exist yet
const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users';").get();
if (!row) {
  const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schemaSQL);
  console.log('🗄️ Database schema initialized from schema.sql');
}

export default db;
