import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { Restaurant } from "../type/restaurant";

const API = "";

/**
 * Favoris gérés côté backend (table SQLite `favoris`).
 * Le frontend ne fait que consommer l'API /favoris.
 */
export function useFavoris() {
  const [favoris, setFavoris] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const chargerFavoris = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/favoris`);
      setFavoris(res.data);
    } catch (err) {
      console.error("Erreur chargement favoris:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    chargerFavoris();
  }, [chargerFavoris]);

  const ajouterFavori = async (restaurant: Restaurant) => {
    await axios.post(`${API}/favoris/${restaurant.id}`);
    await chargerFavoris();
  };

  const supprimerFavori = async (id: number) => {
    await axios.delete(`${API}/favoris/${id}`);
    await chargerFavoris();
  };

  const viderFavoris = async () => {
    await axios.delete(`${API}/favoris`);
    setFavoris([]);
  };

  const estFavori = (id: number) => favoris.some(f => f.id === id);

  return { favoris, loading, ajouterFavori, supprimerFavori, viderFavoris, estFavori, chargerFavoris };
}
