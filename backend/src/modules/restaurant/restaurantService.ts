import { RestaurantRepository } from "./restaurantRepository";
import { Restaurant } from "./types/restaurant";

export class RestaurantService {
  constructor(private repo: RestaurantRepository) {}

  getAll(): Restaurant[] {
    return this.repo.findAll();
  }

  getById(id: number): Restaurant {
    const restaurant = this.repo.findById(id);

    if (!restaurant) {
      throw new Error("Restaurant non trouvé");
    }

    return restaurant;
  }
}