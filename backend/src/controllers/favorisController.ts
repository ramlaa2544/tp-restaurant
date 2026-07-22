import { Request, Response } from "express";
import { FavorisService } from "../services/favorisService";

export class FavorisController {
  constructor(private service: FavorisService) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const favoris = await this.service.getAll();
      res.json(favoris);
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  ajouter = async (req: Request, res: Response) => {
    try {
      const restaurantId = Number(req.params.restaurantId ?? req.body.restaurantId);
      if (!restaurantId) {
        res.status(400).json({ message: "restaurantId requis" });
        return;
      }
      const favori = await this.service.ajouter(restaurantId);
      res.status(201).json(favori);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  supprimer = async (req: Request, res: Response) => {
    try {
      const restaurantId = Number(req.params.restaurantId);
      await this.service.supprimer(restaurantId);
      res.json({ message: "Favori retiré" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  vider = async (_req: Request, res: Response) => {
    try {
      await this.service.vider();
      res.json({ message: "Favoris vidés" });
    } catch {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };
}
