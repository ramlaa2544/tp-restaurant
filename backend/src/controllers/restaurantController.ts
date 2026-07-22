import { Request, Response } from "express";
import { RestaurantService } from "../services/restaurantService";
import { createRestaurantSchema, updateRestaurantSchema } from "../schema/restaurantSchema";
import { RechercheFactory, CritereRecherche } from "../patterns/factory/RechercheFactory";

export class RestaurantController {
  constructor(private service: RestaurantService) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      res.json(await this.service.getAll());
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      res.json(await this.service.getById(Number(req.params.id)));
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  search = async (req: Request, res: Response) => {
    try {
      const criteres: CritereRecherche = {
        prixMax: req.query.prixMax as string | undefined,
        cuisine: req.query.cuisine as string | undefined,
        distanceMax: req.query.distanceMax as string | undefined,
        populariteMin: req.query.populariteMin as string | undefined,
        triPar: req.query.triPar as string | undefined,
      };
      // Factory → filtres + Strategy de tri
      const filters = RechercheFactory.creerFiltres(criteres);
      const sort = RechercheFactory.creerTri(criteres.triPar);
      res.json(await this.service.filtrerEtTrier(filters, sort));
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };

  recommend = async (_req: Request, res: Response) => {
    try {
      res.json(await this.service.recommander());
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
      res.status(201).json(await this.service.create(value));
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { error, value } = updateRestaurantSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      res.json(await this.service.update(Number(req.params.id), value));
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(Number(req.params.id));
      res.json({ message: "Restaurant supprimé avec succès" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}
