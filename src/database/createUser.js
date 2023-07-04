const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const database = new sqlite3.Database(dbPath);

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT,
      password TEXT
    )
  `);
});

database.close();