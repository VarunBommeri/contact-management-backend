// db/setup.js
// db/setup.js
import database from './database.js';

const setupDatabase = async () => {
  const db = await database();

  // Create Users Table
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (n
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Create Contacts Table
  await db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY ,
      userId INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      timezone TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  await db.close();
};

setupDatabase().catch(console.error);
