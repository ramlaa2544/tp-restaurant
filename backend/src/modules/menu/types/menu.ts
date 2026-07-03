export interface Menu {
  id: number;
  nom: string;
  prix: number;
  description: string;
  restoId: number;
}

export interface MenuRequest {
  nom: string;
  prix: number;
  description: string;
  restoId: number;
}