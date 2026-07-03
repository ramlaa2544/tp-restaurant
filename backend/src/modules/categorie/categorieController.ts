import { Request, Response } from "express";
import { CategorieService } from "./categorieService";

export class CategorieController {
  constructor(private service: CategorieService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = this.service.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const categorie = this.service.getById(id);
      res.json(categorie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}