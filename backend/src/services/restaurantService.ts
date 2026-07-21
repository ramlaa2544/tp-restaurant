import { IRestaurantRepository } from "../repositories/IRestaurantRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
import { ISortStrategy } from "../patterns/strategies/ISortStrategy";
import { IFilter } from "../patterns/filters/IFilter";
import { BarycentreScoring } from "../patterns/scoring/BarycentreScoring";

export class RestaurantService {
  constructor(private repo: IRestaurantRepository) {}

  async getAll(): Promise<Restaurant[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Restaurant> {
    const restaurant = await this.repo.findById(id);
    if (!restaurant) throw new Error("Restaurant non trouvé");
    return restaurant;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    return this.repo.create(data);
  }

  async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant> {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error("Restaurant non trouvé");
    return updated;
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const restaurant = await this.repo.findById(id);
    if (!restaurant) throw new Error("Restaurant non trouvé");
    await this.repo.delete(id);
    return { success: true };
  }

  async filtrerEtTrier(
    filters: IFilter[],
    sort: ISortStrategy,
    profil?: number[]
  ): Promise<Restaurant[]> {
    const tous = await this.repo.findAll();

    console.log("Nombre de restaurants:", tous.length);

    const filtres = tous.filter(r =>
      filters.every(f => f.filter(r))
    );

    if (profil) {
      const scoring = new BarycentreScoring();
      const scores = filtres.map(r => ({
        restaurant: r,
        score: scoring.score(r, profil),
      }));
      scores.sort((a, b) => b.score - a.score);
      return scores.map(s => s.restaurant);
    }

    return sort.sort(filtres);
  }
}