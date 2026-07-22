import { Request, Response } from "express";

import { createMenuSchema, updateMenuSchema } from "../schema/menuSchema";
import { MenuService } from "../services/menuService";

export class MenuController {
  constructor(private service: MenuService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const menus = await this.service.getAll();
      res.json(menus);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const menu = await this.service.getById(id);
      res.json(menu);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  getByRestoId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const menus = await this.service.getByRestoId(id);
      res.json(menus);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { error, value } = createMenuSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const menu = await this.service.create(value);
      res.status(201).json(menu);
    } catch (err: any) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { error, value } = updateMenuSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
      const menu = await this.service.update(id, value);
      res.json(menu);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.service.delete(id);
      res.json({ message: "Menu supprimé avec succès" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}