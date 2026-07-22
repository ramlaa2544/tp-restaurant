import fs from "fs";
import path from "path";
import { Restaurant } from "../types/restaurant";

const STORE_PATH = path.join(process.cwd(), "restaurants-mock.json");

const SEED: Restaurant[] = [
  { id: 1, nom: "Le Petit Bistro", cuisine: "Français", note: 4.5, prix: 20, ville: "Paris", categorieId: 1, popularite: 85, distance: 1.2 },
  { id: 2, nom: "Tokyo Ramen", cuisine: "Japonais", note: 4.8, prix: 15, ville: "Lyon", categorieId: 2, popularite: 92, distance: 0.8 },
  { id: 3, nom: "Pizza Roma", cuisine: "Italien", note: 4.2, prix: 18, ville: "Paris", categorieId: 3, popularite: 78, distance: 2.1 },
  { id: 4, nom: "Le Burger Club", cuisine: "Américain", note: 3.9, prix: 12, ville: "Bordeaux", categorieId: 4, popularite: 65, distance: 3.5 },
  { id: 5, nom: "Sushi Zen", cuisine: "Japonais", note: 4.6, prix: 25, ville: "Paris", categorieId: 2, popularite: 88, distance: 1.5 },
  { id: 6, nom: "Sakura Grill", cuisine: "Japonais", note: 4.4, prix: 22, ville: "Paris", categorieId: 2, popularite: 80, distance: 1.8 },
  { id: 7, nom: "Trattoria Bella", cuisine: "Italien", note: 4.3, prix: 19, ville: "Lyon", categorieId: 3, popularite: 75, distance: 2.4 },
  { id: 8, nom: "Chez Marcel", cuisine: "Français", note: 4.1, prix: 28, ville: "Paris", categorieId: 1, popularite: 70, distance: 2.0 },
];

function lire(): Restaurant[] {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      ecrire(SEED);
      return SEED.map(r => ({ ...r }));
    }
    const data = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8")) as Restaurant[];
    return Array.isArray(data) ? data : SEED.map(r => ({ ...r }));
  } catch {
    return SEED.map(r => ({ ...r }));
  }
}

function ecrire(restaurants: Restaurant[]): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(restaurants, null, 2), "utf-8");
}

/** Store mutable partagé (mock) — survit aux reloads via JSON */
export const restaurantsMock: Restaurant[] = lire();

export function persistRestaurantsMock(): void {
  ecrire(restaurantsMock);
}

export function nextRestaurantId(): number {
  if (restaurantsMock.length === 0) return 1;
  return Math.max(...restaurantsMock.map(r => r.id)) + 1;
}
