import { Restaurant } from "../types/restaurant";

export const restaurantsMock: Restaurant[] = [
  { id: 1, nom: "Le Petit Bistro", cuisine: "Français", note: 4.5, prix: 20, ville: "Paris", categorieId: 1 },
  { id: 2, nom: "Tokyo Ramen", cuisine: "Japonais", note: 4.8, prix: 15, ville: "Lyon", categorieId: 2 },
  { id: 3, nom: "Pizza Roma", cuisine: "Italien", note: 4.2, prix: 18, ville: "Paris", categorieId: 3 },
  { id: 4, nom: "Le Burger Club", cuisine: "Américain", note: 3.9, prix: 12, ville: "Bordeaux", categorieId: 4 },
  { id: 5, nom: "Sushi Zen", cuisine: "Japonais", note: 4.6, prix: 25, ville: "Paris", categorieId: 2 },
];