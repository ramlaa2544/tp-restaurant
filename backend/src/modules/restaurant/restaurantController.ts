import { Request, Response } from "express";
import { RestaurantService } from "./restaurantService";

export class RestaurantController {
  constructor(private service: RestaurantService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const restaurants = this.service.getAll();
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const restaurant = this.service.getById(id);
      res.json(restaurant);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}