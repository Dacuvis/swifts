import { db } from '../config/database';

export function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      title TEXT NOT NULL,
      author TEXT NOT NULL,
      publisher TEXT NOT NULL,

      isbn TEXT UNIQUE,
      category TEXT NOT NULL,

      description TEXT,

      published_year INTEGER NOT NULL,

      stock INTEGER NOT NULL DEFAULT 0,

      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
