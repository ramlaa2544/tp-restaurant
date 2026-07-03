import { RestaurantRepository } from "./restaurantRepository";
import { RestaurantService } from "./restaurantService";
import { RestaurantController } from "./restaurantController";

const repo = new RestaurantRepository();
const service = new RestaurantService(repo);
const controller = new RestaurantController(service);

export default controller;