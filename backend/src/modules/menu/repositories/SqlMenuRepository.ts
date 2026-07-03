import { IMenuRepository } from "./IMenuRepository";
import { Menu, MenuRequest, MenuUpdateRequest } from "../types/menu";
import db from "../../../db/client";

export class SqlMenuRepository implements IMenuRepository {

  async findAll(): Promise<Menu[]> {
    return db.prepare("SELECT * FROM menus").all() as Menu[];
  }

  async findById(id: number): Promise<Menu | null> {
    return db.prepare("SELECT * FROM menus WHERE id = ?").get(id) as Menu | null;
  }

  async findByRestoId(restoId: number): Promise<Menu[]> {
    return db.prepare("SELECT * FROM menus WHERE restoId = ?").all(restoId) as Menu[];
  }

  async create(data: MenuRequest): Promise<Menu> {
    const result = db.prepare(`
      INSERT INTO menus (nom, prix, description, restoId)
      VALUES (?, ?, ?, ?)
    `).run(data.nom, data.prix, data.description, data.restoId);
    return { id: result.lastInsertRowid as number, ...data };
  }

  async update(id: number, data: MenuUpdateRequest): Promise<Menu | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    db.prepare(`
      UPDATE menus SET nom=?, prix=?, description=?, restoId=? WHERE id=?
    `).run(updated.nom, updated.prix, updated.description, updated.restoId, id);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = db.prepare("DELETE FROM menus WHERE id = ?").run(id);
    return result.changes > 0;
  }
}