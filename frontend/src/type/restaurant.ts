export interface Restaurant {
  id: number;
  nom: string;
  cuisine: string;
  note: number;
  prix: number;
  ville: string;
  categorieId: number;
  popularite: number;
  distance: number;
  /** Présent uniquement après une recommandation */
  score?: number;
}
