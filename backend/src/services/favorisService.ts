import { IFavorisRepository } from "../repositories/IFavorisRepository";
import { Restaurant } from "../types/restaurant";
import { FavorisSubject } from "../patterns/observer/FavorisSubject";

export class FavorisService {
  constructor(
    private repo: IFavorisRepository,
    private subject: FavorisSubject = new FavorisSubject()
  ) {}

  getSubject(): FavorisSubject {
    return this.subject;
  }

  async getAll(): Promise<Restaurant[]> {
    return this.repo.findAll();
  }

  async ajouter(restaurantId: number): Promise<Restaurant> {
    const restaurant = await this.repo.add(restaurantId);
    this.subject.notify({
      type: "ajoute",
      restaurantId,
      timestamp: new Date(),
    });
    return restaurant;
  }

  async supprimer(restaurantId: number): Promise<{ success: boolean }> {
    const ok = await this.repo.remove(restaurantId);
    if (!ok) throw new Error("Favori non trouvé");
    this.subject.notify({
      type: "retire",
      restaurantId,
      timestamp: new Date(),
    });
    return { success: true };
  }

  async vider(): Promise<{ success: boolean }> {
    await this.repo.clear();
    this.subject.notify({
      type: "vide",
      timestamp: new Date(),
    });
    return { success: true };
  }

  async estFavori(restaurantId: number): Promise<boolean> {
    return this.repo.exists(restaurantId);
  }
}
