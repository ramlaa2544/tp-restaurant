import { ICategorieRepository } from "./ICategorieRepository";
import { Categorie, CategorieRequest, CategorieUpdateRequest } from "../types/categorie";
import db from "../../../db/client";

export class SqlCategorieRepository implements ICategorieRepository {

  async findAll(): Promise<Categorie[]> {
    return db.prepare("SELECT * FROM categories").all() as Categorie[];
  }

  async findById(id: number): Promise<Categorie | null> {
    return db.prepare("SELECT * FROM categories WHERE id = ?").get(id) as Categorie | null;
  }

  async create(data: CategorieRequest): Promise<Categorie> {
    const result = db.prepare("INSERT INTO categories (nom) VALUES (?)").run(data.nom);
    return { id: result.lastInsertRowid as number, ...data };
  }

  async update(id: number, data: CategorieUpdateRequest): Promise<Categorie | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    db.prepare("UPDATE categories SET nom=? WHERE id=?").run(updated.nom, id);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = db.prepare("DELETE FROM categories WHERE id = ?").run(id);
    return result.changes > 0;
  }
}