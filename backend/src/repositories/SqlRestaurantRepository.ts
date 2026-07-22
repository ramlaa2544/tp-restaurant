import { IRestaurantRepository } from "./IRestaurantRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
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

export class SqlRestaurantRepository implements IRestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    const rows = db.prepare("SELECT * FROM restaurants ORDER BY id").all() as Record<string, unknown>[];
    return rows.map(mapRow);
  }

  async findById(id: number): Promise<Restaurant | null> {
    const row = db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id) as Record<string, unknown> | undefined;
    return row ? mapRow(row) : null;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    const result = db.prepare(`
      INSERT INTO restaurants (nom, cuisine, note, prix, ville, categorieId, popularite, distance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.nom,
      data.cuisine,
      Number(data.note) || 0,
      Number(data.prix) || 0,
      data.ville,
      Number(data.categorieId) || 1,
      Number(data.popularite) || 0,
      Number(data.distance) || 0
    );
    const id = Number(result.lastInsertRowid);
    return (await this.findById(id))!;
  }

  async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    db.prepare(`
      UPDATE restaurants SET nom=?, cuisine=?, note=?, prix=?, ville=?, categorieId=?, popularite=?, distance=? WHERE id=?
    `).run(
      updated.nom,
      updated.cuisine,
      Number(updated.note) || 0,
      Number(updated.prix) || 0,
      updated.ville,
      Number(updated.categorieId) || 1,
      Number(updated.popularite) || 0,
      Number(updated.distance) || 0,
      id
    );
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = db.prepare("DELETE FROM restaurants WHERE id = ?").run(id);
    return result.changes > 0;
  }
}
