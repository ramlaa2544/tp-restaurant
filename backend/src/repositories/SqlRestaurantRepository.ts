import { IRestaurantRepository } from "./IRestaurantRepository";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";
import db from "../db/client";

export class SqlRestaurantRepository implements IRestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    return db.prepare("SELECT * FROM restaurants").all() as Restaurant[];
  }

  async findById(id: number): Promise<Restaurant | null> {
    return db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id) as Restaurant | null;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    const result = db.prepare(`
      INSERT INTO restaurants (nom, cuisine, note, prix, ville, categorieId)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.nom, data.cuisine, data.note, data.prix, data.ville, data.categorieId);
    return { id: result.lastInsertRowid as number, ...data };
  }

  async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    db.prepare(`
      UPDATE restaurants SET nom=?, cuisine=?, note=?, prix=?, ville=?, categorieId=? WHERE id=?
    `).run(updated.nom, updated.cuisine, updated.note, updated.prix, updated.ville, updated.categorieId, id);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = db.prepare("DELETE FROM restaurants WHERE id = ?").run(id);
    return result.changes > 0;
  }
}