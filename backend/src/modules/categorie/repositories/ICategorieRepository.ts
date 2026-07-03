import { Categorie, CategorieRequest, CategorieUpdateRequest } from "../types/categorie";

export interface ICategorieRepository {
  findAll(): Promise<Categorie[]>;
  findById(id: number): Promise<Categorie | null>;
  create(data: CategorieRequest): Promise<Categorie>;
  update(id: number, data: CategorieUpdateRequest): Promise<Categorie | null>;
  delete(id: number): Promise<boolean>;
}