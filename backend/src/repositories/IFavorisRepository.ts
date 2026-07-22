import { Restaurant } from "../types/restaurant";

export interface IFavorisRepository {
  findAll(): Promise<Restaurant[]>;
  add(restaurantId: number): Promise<Restaurant>;
  remove(restaurantId: number): Promise<boolean>;
  clear(): Promise<void>;
  exists(restaurantId: number): Promise<boolean>;
}
