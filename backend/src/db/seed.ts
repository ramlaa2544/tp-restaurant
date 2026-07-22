import db from "./client";

db.exec(`DELETE FROM menus`);
db.exec(`DELETE FROM restaurants`);
db.exec(`DELETE FROM categories`);
db.exec(`DELETE FROM sqlite_sequence WHERE name='menus'`);
db.exec(`DELETE FROM sqlite_sequence WHERE name='restaurants'`);
db.exec(`DELETE FROM sqlite_sequence WHERE name='categories'`);

const insertCat = db.prepare(`INSERT INTO categories (nom) VALUES (?)`);
insertCat.run("Français");
insertCat.run("Japonais");
insertCat.run("Italien");
insertCat.run("Américain");
insertCat.run("Marocain");

const insertResto = db.prepare(`
  INSERT INTO restaurants (nom, cuisine, note, prix, ville, categorieId, popularite, distance)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
insertResto.run("Le Petit Bistro", "Français", 4.5, 20, "Paris", 1, 85, 1.2);
insertResto.run("Tokyo Ramen", "Japonais", 4.8, 15, "Lyon", 2, 92, 0.8);
insertResto.run("Pizza Roma", "Italien", 4.2, 18, "Paris", 3, 78, 2.1);
insertResto.run("Le Burger Club", "Américain", 3.9, 12, "Bordeaux", 4, 65, 3.5);
insertResto.run("Sushi Zen", "Japonais", 4.6, 25, "Paris", 2, 88, 1.5);

const insertMenu = db.prepare(`
  INSERT INTO menus (nom, prix, description, restoId)
  VALUES (?, ?, ?, ?)
`);
insertMenu.run("Steak Frites", 15, "Steak avec frites maison", 1);
insertMenu.run("Soupe à l'oignon", 8, "Soupe traditionnelle française", 1);
insertMenu.run("Ramen Tonkotsu", 12, "Ramen au bouillon de porc", 2);
insertMenu.run("Gyoza", 7, "Raviolis japonais grillés", 2);
insertMenu.run("Pizza Margherita", 11, "Pizza tomate mozzarella basilic", 3);

console.log("Base de données remplie avec succès !");
db.close();