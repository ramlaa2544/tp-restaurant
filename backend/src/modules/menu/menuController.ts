import { Request, Response } from "express";
import { MenuService } from "./menuService";

export class MenuController {
  constructor(private service: MenuService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const menus = this.service.getAll();
      res.json(menus);
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

  getByRestoId = async (req: Request, res: Response) => {
    try {
      const restoId = Number(req.params.restoId);
      const menus = this.service.getByRestoId(restoId);
      res.json(menus);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}