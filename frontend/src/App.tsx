import { useState, useEffect } from "react";
import axios from "axios";
import type { Restaurant } from "./type/restaurant";
import { RestaurantCard } from "./components/RestaurantCard";
import { FilterBar } from "./components/FilterBar";
import { RestaurantForm } from "./components/RestaurantForm";
import { useFavoris } from "./hooks/useFavoris";

const API = "";

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [prixMax, setPrixMax] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [triPar, setTriPar] = useState("note");
  const [distanceMax, setDistanceMax] = useState("");
  const [populariteMin, setPopulariteMin] = useState("");
  const [loading, setLoading] = useState(false);

  const { favoris, ajouterFavori, supprimerFavori, estFavori } = useFavoris();

  useEffect(() => { chargerTous(); }, []);

  const chargerTous = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/restaurants`);
    setRestaurants(res.data);
    setLoading(false);
  };

  const rechercher = async () => {
    setLoading(true);
    const params: Record<string, string> = { triPar };
    if (prixMax) params.prixMax = prixMax;
    if (cuisine) params.cuisine = cuisine;
    if (distanceMax) params.distanceMax = distanceMax;
    if (populariteMin) params.populariteMin = populariteMin;
    const res = await axios.get(`${API}/restaurants/search`, { params });
    setRestaurants(res.data);
    setLoading(false);
  };

  const recommander = () => {
    if (favoris.length === 0) {
      alert("Ajoutez des favoris d'abord !");
      return;
    }
    const favorisTries = [...favoris].sort((a, b) => b.note - a.note);
    setRestaurants(favorisTries);
  };

  const viderFavoris = () => {
    localStorage.clear();
    window.location.reload();
  };

  const ajouterRestaurant = async (data: Omit<Restaurant, "id">) => {
    await axios.post(`${API}/restaurants`, data);
    chargerTous();
  };

  const modifierRestaurant = async (id: number, data: Partial<Restaurant>) => {
    await axios.put(`${API}/restaurants/${id}`, data);
    chargerTous();
  };

  const supprimerRestaurant = async (id: number) => {
    if (!confirm("Supprimer ce restaurant ?")) return;
    await axios.delete(`${API}/restaurants/${id}`);
    chargerTous();
  };

  const gererFavori = (restaurant: Restaurant) => {
    if (estFavori(restaurant.id)) {
      supprimerFavori(restaurant.id);
    } else {
      ajouterFavori(restaurant);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px", textAlign: "center", color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}>
        <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", fontWeight: "800" }}>
          🍽️ RestaurantApp
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, margin: 0 }}>
          Trouvez le restaurant parfait pour vous
        </p>
        <div style={{
          display: "inline-block", marginTop: "15px",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "20px", padding: "6px 16px", fontSize: "0.9rem",
        }}>
          ❤️ {favoris.length} favori(s)
        </div>
        <button onClick={viderFavoris} style={{
          marginTop: "10px", padding: "6px 16px",
          backgroundColor: "rgba(255,255,255,0.2)", color: "white",
          border: "1px solid rgba(255,255,255,0.4)", borderRadius: "20px",
          cursor: "pointer", fontSize: "0.85rem", display: "block", margin: "10px auto 0",
        }}>
          🗑️ Vider les favoris
        </button>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" }}>
        <RestaurantForm onAjouter={ajouterRestaurant} />
        <FilterBar
          prixMax={prixMax} cuisine={cuisine} triPar={triPar}
          distanceMax={distanceMax} populariteMin={populariteMin}
          onPrixMax={setPrixMax} onCuisine={setCuisine} onTriPar={setTriPar}
          onDistanceMax={setDistanceMax} onPopulariteMin={setPopulariteMin}
          onSearch={rechercher} onScoring={recommander}
        />
        <button onClick={chargerTous} style={{
          marginBottom: "20px", padding: "8px 16px", backgroundColor: "white",
          border: "1px solid #ddd", borderRadius: "6px", cursor: "pointer",
          fontSize: "0.9rem", color: "#666",
        }}>
          🔄 Voir tous les restaurants
        </button>

        {loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#667eea", fontSize: "1.1rem" }}>
            ⏳ Chargement...
          </div>
        )}

        {!loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {restaurants.map(r => (
              <RestaurantCard
                key={r.id} restaurant={r}
                estFavori={estFavori(r.id)}
                onFavori={gererFavori}
                onSupprimer={supprimerRestaurant}
                onModifier={modifierRestaurant}
              />
            ))}
          </div>
        )}

        {!loading && restaurants.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>
            <p style={{ fontSize: "3rem" }}>🍽️</p>
            <p>Aucun restaurant trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;