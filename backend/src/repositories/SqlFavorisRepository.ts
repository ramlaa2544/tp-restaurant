import { IFavorisRepository } from "./IFavorisRepository";
import { Restaurant } from "../types/restaurant";
import db from "../db/client";

function mapRow(row: Record<string, unknown>): Restaurant {
  return {
    id: Number(row.id),
    nom: String(row.nom ?? ""),
    cuisine: String(row.cuisine ?? ""),
    note: Number(row.note) || 0,
    prix: Number(row.prix) || 0,
    ville: String(row.ville ?? ""),
    categorieId: Number(row.categorieId) || 1,
    popularite: Number(row.popularite) || 0,
    distance: Number(row.distance) || 0,
  };
}

export class SqlFavorisRepository implements IFavorisRepository {

  async findAll(): Promise<Restaurant[]> {
    const rows = db.prepare(`
      SELECT r.* FROM restaurants r
      INNER JOIN favoris f ON f.restaurantId = r.id
      ORDER BY r.note DESC
    `).all() as Record<string, unknown>[];
    return rows.map(mapRow);
  }

  async add(restaurantId: number): Promise<Restaurant> {
    const row = db.prepare("SELECT * FROM restaurants WHERE id = ?").get(restaurantId) as Record<string, unknown> | undefined;
    if (!row) throw new Error("Restaurant non trouvé");

    db.prepare("INSERT OR IGNORE INTO favoris (restaurantId) VALUES (?)").run(Number(restaurantId));
    return mapRow(row);
  }

  async remove(restaurantId: number): Promise<boolean> {
    const result = db.prepare("DELETE FROM favoris WHERE restaurantId = ?").run(Number(restaurantId));
    return result.changes > 0;
  }

  async clear(): Promise<void> {
    db.prepare("DELETE FROM favoris").run();
  }

  async exists(restaurantId: number): Promise<boolean> {
    const row = db.prepare("SELECT 1 FROM favoris WHERE restaurantId = ?").get(Number(restaurantId));
    return !!row;
  }
}
