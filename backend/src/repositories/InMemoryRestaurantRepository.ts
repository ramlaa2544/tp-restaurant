import { IRestaurantRepository } from "./IRestaurantRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
import { restaurantsMock, persistRestaurantsMock, nextRestaurantId } from "../mocks/restaurants";

function sanitiser(data: RestaurantRequest): RestaurantRequest {
  return {
    nom: String(data.nom ?? "").trim(),
    cuisine: String(data.cuisine ?? "").trim(),
    note: Number(data.note) || 0,
    prix: Number(data.prix) || 0,
    ville: String(data.ville ?? "").trim(),
    categorieId: Number(data.categorieId) || 1,
    popularite: Number(data.popularite) || 0,
    distance: Number(data.distance) || 0,
  };
}

export class InMemoryRestaurantRepository implements IRestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    return [...restaurantsMock];
  }

  async findById(id: number): Promise<Restaurant | null> {
    return restaurantsMock.find(r => r.id === id) ?? null;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    const clean = sanitiser(data);
    const newResto: Restaurant = { id: nextRestaurantId(), ...clean };
    restaurantsMock.push(newResto);
    persistRestaurantsMock();
    return newResto;
  }

  async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null> {
    const index = restaurantsMock.findIndex(r => r.id === id);
    if (index === -1) return null;
    const merged = { ...restaurantsMock[index], ...data };
    restaurantsMock[index] = {
      ...merged,
      note: Number(merged.note) || 0,
      prix: Number(merged.prix) || 0,
      popularite: Number(merged.popularite) || 0,
      distance: Number(merged.distance) || 0,
      categorieId: Number(merged.categorieId) || 1,
    };
    persistRestaurantsMock();
    return restaurantsMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = restaurantsMock.findIndex(r => r.id === id);
    if (index === -1) return false;
    restaurantsMock.splice(index, 1);
    persistRestaurantsMock();
    return true;
  }
}
