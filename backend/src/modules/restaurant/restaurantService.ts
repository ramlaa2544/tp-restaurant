import { RestaurantRepository } from "./restaurantRepository";
import { RestaurantRequest, RestaurantUpdateRequest } from "./types/restaurant";

export class RestaurantService {
  constructor(private repo: RestaurantRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  async getById(id: number) {
    const restaurant = await this.repo.findById(id);
    if (!restaurant) throw new Error("Restaurant non trouvé");
    return restaurant;
  }

  create(data: RestaurantRequest) {
    return this.repo.create(data);
  }

  async update(id: number, data: RestaurantUpdateRequest) {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error("Restaurant non trouvé");
    return updated;
  }

  async delete(id: number) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("Restaurant non trouvé");
    return { success: true };
  }
}