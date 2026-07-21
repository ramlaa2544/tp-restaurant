import { ICategorieRepository } from "../repositories/ICategorieRepository";
import { CategorieRequest, CategorieUpdateRequest } from "../types/categorie";

export class CategorieService {
  constructor(private repo: ICategorieRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  async getById(id: number) {
    const categorie = await this.repo.findById(id);
    if (!categorie) throw new Error("Catégorie non trouvée");
    return categorie;
  }

  create(data: CategorieRequest) {
    return this.repo.create(data);
  }

  async update(id: number, data: CategorieUpdateRequest) {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error("Catégorie non trouvée");
    return updated;
  }

  async delete(id: number) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("Catégorie non trouvée");
    return { success: true };
  }
}