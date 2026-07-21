import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurantService";
import { createRestaurantSchema, updateRestaurantSchema } from "../schema/restaurantSchema";
import { IFilter } from "../patterns/filters/IFilter";
import { FilterByPrix } from "../patterns/filters/FilterByPrix";
import { FilterByCuisine } from "../patterns/filters/FilterByCuisine";
import { ISortStrategy } from "../patterns/strategies/ISortStrategy";
import { SortByNote } from "../patterns/strategies/SortByNote";
import { SortByPrix } from "../patterns/strategies/SortByPrix";

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

  search = async (req: Request, res: Response) => {
    try {
      const { prixMax, cuisine, triPar, profil } = req.query;

      console.log("Profil reçu:", profil);

      const filters: IFilter[] = [];
      if (prixMax) filters.push(new FilterByPrix(Number(prixMax)));
      if (cuisine) filters.push(new FilterByCuisine(String(cuisine)));

      const sort: ISortStrategy = triPar === "prix"
        ? new SortByPrix()
        : new SortByNote();

      const profilArray = profil
        ? String(profil).split(",").map(Number)
        : undefined;

      console.log("Profil array:", profilArray);

      const restaurants = await this.service.filtrerEtTrier(
        filters,
        sort,
        profilArray
      );

      res.json(restaurants);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
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