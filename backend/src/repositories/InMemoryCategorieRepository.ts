import { ICategorieRepository } from "./ICategorieRepository";
import { Categorie, CategorieRequest, CategorieUpdateRequest } from "../types/categorie";
import { categoriesMock } from "../mocks/categories";

export class InMemoryCategorieRepository implements ICategorieRepository {

  async findAll(): Promise<Categorie[]> {
    return categoriesMock;
  }

  async findById(id: number): Promise<Categorie | null> {
    return categoriesMock.find(c => c.id === id) ?? null;
  }

  async create(data: CategorieRequest): Promise<Categorie> {
    const newCat: Categorie = { id: categoriesMock.length + 1, ...data };
    categoriesMock.push(newCat);
    return newCat;
  }

  async update(id: number, data: CategorieUpdateRequest): Promise<Categorie | null> {
    const index = categoriesMock.findIndex(c => c.id === id);
    if (index === -1) return null;
    categoriesMock[index] = { ...categoriesMock[index], ...data };
    return categoriesMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = categoriesMock.findIndex(c => c.id === id);
    if (index === -1) return false;
    categoriesMock.splice(index, 1);
    return true;
  }
}