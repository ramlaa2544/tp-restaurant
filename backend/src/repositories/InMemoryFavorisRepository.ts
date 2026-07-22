import fs from "fs";
import path from "path";
import { IFavorisRepository } from "./IFavorisRepository";
import { Restaurant } from "../types/restaurant";
import { restaurantsMock } from "../mocks/restaurants";

const STORE_PATH = path.join(process.cwd(), "favoris-mock.json");

function lireIds(): Set<number> {
  try {
    if (!fs.existsSync(STORE_PATH)) return new Set();
    const data = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8")) as number[];
    return new Set(data);
  } catch {
    return new Set();
  }
}

function ecrireIds(ids: Set<number>): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify([...ids]), "utf-8");
}

/**
 * Favoris en mémoire + fichier JSON pour survivre aux reloads tsx watch.
 */
export class InMemoryFavorisRepository implements IFavorisRepository {
  private ids = lireIds();

  async findAll(): Promise<Restaurant[]> {
    this.ids = lireIds();
    return restaurantsMock
      .filter(r => this.ids.has(r.id))
      .sort((a, b) => b.note - a.note);
  }

  async add(restaurantId: number): Promise<Restaurant> {
    const restaurant = restaurantsMock.find(r => r.id === restaurantId);
    if (!restaurant) throw new Error("Restaurant non trouvé");
    this.ids = lireIds();
    this.ids.add(restaurantId);
    ecrireIds(this.ids);
    return restaurant;
  }

  async remove(restaurantId: number): Promise<boolean> {
    this.ids = lireIds();
    const ok = this.ids.delete(restaurantId);
    ecrireIds(this.ids);
    return ok;
  }

  async clear(): Promise<void> {
    this.ids.clear();
    ecrireIds(this.ids);
  }

  async exists(restaurantId: number): Promise<boolean> {
    this.ids = lireIds();
    return this.ids.has(restaurantId);
  }
}
