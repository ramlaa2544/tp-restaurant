import { Restaurant } from "../types/restaurant";

export const restaurantsMock: Restaurant[] = [
  { id: 1, nom: "Le Petit Bistro", cuisine: "Français", note: 4.5, prix: 20, ville: "Paris", categorieId: 1, popularite: 85, distance: 1.2 },
  { id: 2, nom: "Tokyo Ramen", cuisine: "Japonais", note: 4.8, prix: 15, ville: "Lyon", categorieId: 2, popularite: 92, distance: 0.8 },
  { id: 3, nom: "Pizza Roma", cuisine: "Italien", note: 4.2, prix: 18, ville: "Paris", categorieId: 3, popularite: 78, distance: 2.1 },
  { id: 4, nom: "Le Burger Club", cuisine: "Américain", note: 3.9, prix: 12, ville: "Bordeaux", categorieId: 4, popularite: 65, distance: 3.5 },
  { id: 5, nom: "Sushi Zen", cuisine: "Japonais", note: 4.6, prix: 25, ville: "Paris", categorieId: 2, popularite: 88, distance: 1.5 },
];