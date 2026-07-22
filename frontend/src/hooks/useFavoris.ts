import { useState } from "react";
import type { Restaurant } from "../type/restaurant";

export function useFavoris() {
  const [favoris, setFavoris] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem("favoris");
    return saved ? JSON.parse(saved) : [];
  });

  const ajouterFavori = (restaurant: Restaurant) => {
    const nouveaux = [...favoris, restaurant];
    setFavoris(nouveaux);
    localStorage.setItem("favoris", JSON.stringify(nouveaux));
  };

  const supprimerFavori = (id: number) => {
    const nouveaux = favoris.filter(f => f.id !== id);
    setFavoris(nouveaux);
    localStorage.setItem("favoris", JSON.stringify(nouveaux));
  };

  const estFavori = (id: number) => {
    return favoris.some(f => f.id === id);
  };

  const getProfil = (): number[] => {
    if (favoris.length === 0) return [];

    const noteMoy = favoris.reduce((sum, f) => sum + f.note, 0) / favoris.length;
    const prixMoy = favoris.reduce((sum, f) => sum + f.prix, 0) / favoris.length;
    const populariteMoy = favoris.reduce((sum, f) => sum + f.popularite, 0) / favoris.length;
    const distanceMoy = favoris.reduce((sum, f) => sum + f.distance, 0) / favoris.length;

    return [
      noteMoy / 5,
      1 - prixMoy / 100,
      populariteMoy / 100,
      1 - distanceMoy / 10,
    ];
  };

  return { favoris, ajouterFavori, supprimerFavori, estFavori, getProfil };
}