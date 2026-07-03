import { isMock } from "../../config/dataSource";
import { restaurantsMock } from "./mocks/restaurants";
import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "./types/restaurant";
import db from "../../db/client";

export class RestaurantRepository {

  async findAll(): Promise<Restaurant[]> {
    if (isMock()) return restaurantsMock;
    return db.prepare("SELECT * FROM restaurants").all() as Restaurant[];
  }

  async findById(id: number): Promise<Restaurant | null> {
    if (isMock()) return restaurantsMock.find(r => r.id === id) ?? null;
    return db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id) as Restaurant | null;
  }

  async create(data: RestaurantRequest): Promise<Restaurant> {
    if (isMock()) {
      const newResto: Restaurant = { id: restaurantsMock.length + 1, ...data };
      restaurantsMock.push(newResto);
      return newResto;
    }
    const result = db.prepare(`
      INSERT INTO restaurants (nom, cuisine, note, prix, ville, categorieId)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.nom, data.cuisine, data.note, data.prix, data.ville, data.categorieId);
    return { id: result.lastInsertRowid as number, ...data };
  }

 async update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null> {
    if (isMock()) {
      const index = restaurantsMock.findIndex(r => r.id === id);
      if (index === -1) return null;
      restaurantsMock[index] = { ...restaurantsMock[index], ...data };
      return restaurantsMock[index];
    }
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };

    db.prepare(`
      UPDATE restaurants SET nom=?, cuisine=?, note=?, prix=?, ville=?, categorieId=? WHERE id=?
    `).run(updated.nom, updated.cuisine, updated.note, updated.prix, updated.ville, updated.categorieId, id);
    
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    if (isMock()) {
      const index = restaurantsMock.findIndex(r => r.id === id);
      if (index === -1) return false;
      restaurantsMock.splice(index, 1);
      return true;
    }
    db.prepare("DELETE FROM restaurants WHERE id = ?").run(id);
    return true;
  }
}