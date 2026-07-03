import { isMock } from "../../config/dataSource";
import { InMemoryRestaurantRepository } from "./repositories/InMemoryRestaurantRepository";
import { SqlRestaurantRepository } from "./repositories/SqlRestaurantRepository";
import { RestaurantService } from "./services/restaurantService";
import { RestaurantController } from "./controllers/restaurantController";

const repo = isMock()
  ? new InMemoryRestaurantRepository()
  : new SqlRestaurantRepository();

const service = new RestaurantService(repo);
const controller = new RestaurantController(service);

export default controller;