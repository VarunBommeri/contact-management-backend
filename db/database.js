// db/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const database = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  return db;
};

export default database;
