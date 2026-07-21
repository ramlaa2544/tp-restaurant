
import { IRestaurantRepository } from "../repositories/IRestaurantRepository";
import { RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";

export class RestaurantService {
  constructor(private repo: IRestaurantRepository) {}

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
  const restaurant = await this.repo.findById(id);
  if (!restaurant) throw new Error("Restaurant non trouvé");
  await this.repo.delete(id);
  return { success: true };
}
}