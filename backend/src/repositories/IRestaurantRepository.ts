import { Restaurant, RestaurantRequest, RestaurantUpdateRequest } from "../types/restaurant";


export interface IRestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(id: number): Promise<Restaurant | null>;
  create(data: RestaurantRequest): Promise<Restaurant>;
  update(id: number, data: RestaurantUpdateRequest): Promise<Restaurant | null>;
  delete(id: number): Promise<boolean>;
}