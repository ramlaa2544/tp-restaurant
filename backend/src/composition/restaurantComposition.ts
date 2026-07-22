import { isMock } from "../config/dataSource";
import { RestaurantController } from "../controllers/restaurantController";
import { InMemoryRestaurantRepository } from "../repositories/InMemoryRestaurantRepository";
import { SqlRestaurantRepository } from "../repositories/SqlRestaurantRepository";
import { RestaurantService } from "../services/restaurantService";
import { favorisRepo } from "./favorisComposition";

const repo = isMock()
  ? new InMemoryRestaurantRepository()
  : new SqlRestaurantRepository();

const service = new RestaurantService(repo, favorisRepo);
const controller = new RestaurantController(service);

export default controller;
