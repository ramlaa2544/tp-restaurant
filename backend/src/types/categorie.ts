export interface Categorie {
  id: number;
  nom: string;
}

export interface CategorieRequest {
  nom: string;
}

export type CategorieUpdateRequest = Partial<CategorieRequest>;