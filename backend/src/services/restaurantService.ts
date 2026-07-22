import { IRestaurantRepository } from "../repositories/IRestaurantRepository";
import { IFavorisRepository } from "../repositories/IFavorisRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
import { ISortStrategy } from "../patterns/strategies/ISortStrategy";
import { IFilter } from "../patterns/filters/IFilter";
import { BarycentreScoring } from "../patterns/scoring/BarycentreScoring";
import { FilterChain } from "../patterns/chain/FilterChain";

export type RestaurantAvecScore = Restaurant & { score: number };

export class RestaurantService {
  constructor(
    private repo: IRestaurantRepository,
    private favorisRepo?: IFavorisRepository
  ) {}

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
    if (this.favorisRepo) await this.favorisRepo.remove(id);
    await this.repo.delete(id);
    return { success: true };
  }

  async filtrerEtTrier(filters: IFilter[], sort: ISortStrategy): Promise<Restaurant[]> {
    const tous = await this.repo.findAll();
    const filtres = FilterChain.from(filters).execute(tous);
    return sort.sort(filtres);
  }

  /**
   * Recommandation :
   * - charge restos + favoris depuis la DB
   * - calcule le barycentre pondéré des favoris
   * - score chaque resto par proximité au profil (+ bonus cuisine)
   * - trie du mieux matché au moins matché
   */
  async recommander(): Promise<RestaurantAvecScore[]> {
    const favoris = this.favorisRepo ? await this.favorisRepo.findAll() : [];
    const tous = await this.repo.findAll();
    if (tous.length === 0) return [];

    const scoring = new BarycentreScoring();
    const bornes = scoring.calculerBornes(tous);
    const profil = scoring.calculerProfil(favoris, bornes);

    const scores: RestaurantAvecScore[] = tous.map(r => ({
      ...r,
      score: scoring.score(r, profil, bornes, favoris),
    }));

    // Meilleur score d'abord ; à égalité, le plus proche (km) gagne
    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.distance - b.distance;
    });
    return scores;
  }
}
