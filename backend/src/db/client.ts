import Database from "better-sqlite3";

const db = new Database("dev.db");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    note REAL NOT NULL,
    prix REAL NOT NULL,
    ville TEXT NOT NULL,
    categorieId INTEGER NOT NULL,
    popularite REAL NOT NULL DEFAULT 0,
    distance REAL NOT NULL DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix REAL NOT NULL,
    description TEXT NOT NULL,
    restoId INTEGER NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS favoris (
    restaurantId INTEGER PRIMARY KEY,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id) ON DELETE CASCADE
  )
`);

export default db;
