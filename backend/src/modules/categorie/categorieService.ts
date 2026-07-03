import { CategorieRepository } from "./categorieRepository";
import { Categorie } from "./types/categorie";

export class CategorieService {
  constructor(private repo: CategorieRepository) {}

  getAll(): Categorie[] {
    return this.repo.findAll();
  }

  getById(id: number): Categorie {
    const categorie = this.repo.findById(id);

    if (!categorie) {
      throw new Error("Catégorie non trouvée");
    }

    return categorie;
  }

  getByNom(nom: string): Categorie {
    const categorie = this.repo.findByNom(nom);

    if (!categorie) {
      throw new Error("Catégorie non trouvée");
    }

    return categorie;
  }
}