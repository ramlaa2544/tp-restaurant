import { useState } from "react";
import type { Restaurant } from "../type/restaurant";

interface Props {
  onAjouter: (data: Omit<Restaurant, "id">) => void;
}

export function RestaurantForm({ onAjouter }: Props) {
  const [ouvert, setOuvert] = useState(false);
  const [nom, setNom] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [note, setNote] = useState("");
  const [prix, setPrix] = useState("");
  const [ville, setVille] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [popularite, setPopularite] = useState("");
  const [distance, setDistance] = useState("");

  const handleSubmit = () => {
    if (!nom || !cuisine || !note || !prix || !ville || !categorieId || !popularite || !distance) {
      alert("Remplis tous les champs !");
      return;
    }
    onAjouter({
      nom, cuisine,
      note: Number(note), prix: Number(prix),
      ville, categorieId: Number(categorieId),
      popularite: Number(popularite), distance: Number(distance),
    });
    setNom(""); setCuisine(""); setNote("");
    setPrix(""); setVille(""); setCategorieId("");
    setPopularite(""); setDistance("");
    setOuvert(false);
  };

  if (!ouvert) {
    return (
      <button onClick={() => setOuvert(true)} style={{
        padding: "12px 24px", backgroundColor: "#667eea", color: "white",
        border: "none", borderRadius: "10px", cursor: "pointer",
        fontWeight: "700", fontSize: "1rem", marginBottom: "20px",
        boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
      }}>
        ➕ Ajouter un restaurant
      </button>
    );
  }

  return (
    <div style={{
      backgroundColor: "white", borderRadius: "16px", padding: "24px",
      marginBottom: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    }}>
      <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>➕ Nouveau restaurant</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        {[
          { placeholder: "Nom du restaurant", value: nom, onChange: setNom, type: "text" },
          { placeholder: "Cuisine (ex: Japonais)", value: cuisine, onChange: setCuisine, type: "text" },
          { placeholder: "Note (0-5)", value: note, onChange: setNote, type: "number" },
          { placeholder: "Prix moyen (€)", value: prix, onChange: setPrix, type: "number" },
          { placeholder: "Ville", value: ville, onChange: setVille, type: "text" },
          { placeholder: "Catégorie ID (1-5)", value: categorieId, onChange: setCategorieId, type: "number" },
          { placeholder: "Popularité (0-100)", value: popularite, onChange: setPopularite, type: "number" },
          { placeholder: "Distance (km)", value: distance, onChange: setDistance, type: "number" },
        ].map((field, i) => (
          <input key={i} type={field.type} placeholder={field.placeholder}
            value={field.value} onChange={e => field.onChange(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem", outline: "none" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleSubmit} style={{
          flex: 1, padding: "12px", backgroundColor: "#51cf66",
          color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700",
        }}>✅ Sauvegarder</button>
        <button onClick={() => setOuvert(false)} style={{
          flex: 1, padding: "12px", backgroundColor: "#ff6b6b",
          color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700",
        }}>❌ Annuler</button>
      </div>
    </div>
  );
}