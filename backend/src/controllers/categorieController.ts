import { Request, Response } from "express";
import { CategorieService } from "../services/categorieService";
import { createCategorieSchema, updateCategorieSchema } from "../schema/categorieSchema";


export class CategorieController {
  constructor(private service: CategorieService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.service.getAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const categorie = await this.service.getById(id);
      res.json(categorie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { error, value } = createCategorieSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const categorie = await this.service.create(value);
      res.status(201).json(categorie);
    } catch (err: any) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { error, value } = updateCategorieSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const categorie = await this.service.update(id, value);
      res.json(categorie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      res.json({ message: "Catégorie supprimée avec succès" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}