export interface Restaurant {
  id: number;
  nom: string;
  cuisine: string;
  note: number;
  prix: number;
  ville: string;
  categorieId: number;
}

export interface RestaurantRequest {
  nom: string;
  cuisine: string;
  note: number;
  prix: number;
  ville: string;
  categorieId: number;
}

export type RestaurantUpdateRequest = Partial<RestaurantRequest>;