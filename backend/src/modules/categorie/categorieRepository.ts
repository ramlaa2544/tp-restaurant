import { isMock } from "../../config/dataSource";
import { categoriesMock } from "./mocks/categories";
import { Categorie } from "./types/categorie";
import db from "../../db/client";

export class CategorieRepository {
  findAll(): Categorie[] {
    if (isMock()) {
      return categoriesMock;
    }
    return db.prepare("SELECT * FROM categories").all() as Categorie[];
  }

  findById(id: number): Categorie | null {
    if (isMock()) {
      return categoriesMock.find(c => c.id === id) ?? null;
    }
    return db.prepare("SELECT * FROM categories WHERE id = ?").get(id) as Categorie | null;
  }

  findByNom(nom: string): Categorie | null {
    if (isMock()) {
      return categoriesMock.find(c => c.nom.toLowerCase() === nom.toLowerCase()) ?? null;
    }
    return db.prepare("SELECT * FROM categories WHERE LOWER(nom) = LOWER(?)").get(nom) as Categorie | null;
  }
}