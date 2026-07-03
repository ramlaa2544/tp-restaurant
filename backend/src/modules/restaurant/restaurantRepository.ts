import { isMock } from "../../config/dataSource";
import { restaurantsMock } from "./mocks/restaurants";
import { Restaurant, RestaurantRequest } from "./types/restaurant";
import db from "../../db/client";

export class RestaurantRepository {
  findAll(): Restaurant[] {
    if (isMock()) {
      return restaurantsMock;
    }
    return db.prepare("SELECT * FROM restaurants").all() as Restaurant[];
  }

  findById(id: number): Restaurant | null {
    if (isMock()) {
      return restaurantsMock.find(r => r.id === id) ?? null;
    }
    return db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id) as Restaurant | null;
  }
}