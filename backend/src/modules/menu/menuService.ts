import { MenuRepository } from "./menuRepository";
import { Menu } from "./types/menu";

export class MenuService {
  constructor(private repo: MenuRepository) {}

  getAll(): Menu[] {
    return this.repo.findAll();
  }

  getById(id: number): Menu {
    const menu = this.repo.findById(id);

    if (!menu) {
      throw new Error("Menu non trouvé");
    }

    return menu;
  }

  getByRestoId(restoId: number): Menu[] {
    return this.repo.findByRestoId(restoId);
  }
}