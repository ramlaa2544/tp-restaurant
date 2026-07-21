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

    // Normalisation identique au backend
    const noteNorm = noteMoy / 5;
    const prixNorm = 1 - prixMoy / 100;

    console.log("Profil calculé:", noteNorm, prixNorm);

    return [noteNorm, prixNorm];
  };

  return { favoris, ajouterFavori, supprimerFavori, estFavori, getProfil };
}