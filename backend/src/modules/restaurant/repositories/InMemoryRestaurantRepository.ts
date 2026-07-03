import { IRestaurantRepository } from "./IRestaurantRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
import { restaurantsMock } from "../mocks/restaurants";

export class InMemoryRestaurantRepository implements IRestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    return restaurantsMock;
  }

  async findById(id: number): Promise<Restaurant | null> {
    return restaurantsMock.find(r => r.id === id) ?? null;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    const newResto: Restaurant = { id: restaurantsMock.length + 1, ...data };
    restaurantsMock.push(newResto);
    return newResto;
  }

  async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null> {
    const index = restaurantsMock.findIndex(r => r.id === id);
    if (index === -1) return null;
    restaurantsMock[index] = { ...restaurantsMock[index], ...data };
    return restaurantsMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = restaurantsMock.findIndex(r => r.id === id);
    if (index === -1) return false;
    restaurantsMock.splice(index, 1);
    return true;
  }
}