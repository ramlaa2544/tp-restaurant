import { isMock } from "../../config/dataSource";
import { menusMock } from "./mocks/menus";
import { Menu } from "./types/menu";
import db from "../../db/client";

export class MenuRepository {
  findAll(): Menu[] {
    if (isMock()) {
      return menusMock;
    }
    return db.prepare("SELECT * FROM menus").all() as Menu[];
  }

  findById(id: number): Menu | null {
    if (isMock()) {
      return menusMock.find(m => m.id === id) ?? null;
    }
    return db.prepare("SELECT * FROM menus WHERE id = ?").get(id) as Menu | null;
  }

  findByRestoId(restoId: number): Menu[] {
    if (isMock()) {
      return menusMock.filter(m => m.restoId === restoId);
    }
    return db.prepare("SELECT * FROM menus WHERE restoId = ?").all(restoId) as Menu[];
  }
}