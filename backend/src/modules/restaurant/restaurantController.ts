import { Request, Response } from "express";
import { RestaurantService } from "./restaurantService";
import { createRestaurantSchema, updateRestaurantSchema } from "./restaurantSchema";

export class RestaurantController {
  constructor(private service: RestaurantService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const restaurants = await this.service.getAll();
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const restaurant = await this.service.getById(id);
      res.json(restaurant);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { error, value } = createRestaurantSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const restaurant = await this.service.create(value);
      res.status(201).json(restaurant);
    } catch (err: any) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { error, value } = updateRestaurantSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const restaurant = await this.service.update(id, value);
      res.json(restaurant);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      res.json({ message: "Restaurant supprimé avec succès" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}