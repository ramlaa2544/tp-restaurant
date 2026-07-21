import { useState } from "react";
import type { Restaurant } from "../type/restaurant";


interface Props {
  restaurant: Restaurant;
  estFavori: boolean;
  onFavori: (restaurant: Restaurant) => void;
  onSupprimer: (id: number) => void;
  onModifier: (id: number, data: Partial<Restaurant>) => void;
}

export function RestaurantCard({ restaurant, estFavori, onFavori, onSupprimer, onModifier }: Props) {
  const [enEdition, setEnEdition] = useState(false);
  const [note, setNote] = useState(String(restaurant.note));
  const [prix, setPrix] = useState(String(restaurant.prix));

  const handleModifier = () => {
    onModifier(restaurant.id, { note: Number(note), prix: Number(prix) });
    setEnEdition(false);
  };

  const getCuisineEmoji = (cuisine: string) => {
    const map: Record<string, string> = {
      "Français": "🥖", "Japonais": "🍜", "Italien": "🍕",
      "Américain": "🍔", "Marocain": "🥙", "Chinois": "🥡",
    };
    return map[cuisine] || "🍽️";
  };

  const getNoteColor = (note: number) => {
    if (note >= 4.5) return "#51cf66";
    if (note >= 4.0) return "#ffa94d";
    return "#ff6b6b";
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: estFavori
        ? "0 4px 20px rgba(255, 107, 107, 0.3)"
        : "0 4px 15px rgba(0,0,0,0.08)",
      border: estFavori ? "2px solid #ff6b6b" : "2px solid transparent",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}>

      {/* EN-TÊTE CARTE */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{ fontSize: "2.5rem" }}>{getCuisineEmoji(restaurant.cuisine)}</div>
        <h3 style={{ color: "white", margin: "8px 0 0 0", fontSize: "1.1rem", fontWeight: "700" }}>
          {restaurant.nom}
        </h3>
        {estFavori && (
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            fontSize: "1.2rem",
          }}>❤️</div>
        )}
      </div>

      {/* CONTENU */}
      <div style={{ padding: "16px" }}>
        {enEdition ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="number" value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Note (0-5)"
              style={{ padding: "8px", borderRadius: "8px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }}
            />
            <input
              type="number" value={prix}
              onChange={e => setPrix(e.target.value)}
              placeholder="Prix (€)"
              style={{ padding: "8px", borderRadius: "8px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleModifier} style={{
                flex: 1, padding: "8px", backgroundColor: "#51cf66",
                color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600",
              }}>✅ Sauvegarder</button>
              <button onClick={() => setEnEdition(false)} style={{
                flex: 1, padding: "8px", backgroundColor: "#aaa",
                color: "white", border: "none", borderRadius: "8px", cursor: "pointer",
              }}>❌ Annuler</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>🍽️ {restaurant.cuisine}</span>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>📍 {restaurant.ville}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{
                backgroundColor: getNoteColor(restaurant.note),
                color: "white", padding: "4px 10px",
                borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700",
              }}>⭐ {restaurant.note}/5</span>
              <span style={{
                backgroundColor: "#f0f2f5", color: "#333",
                padding: "4px 10px", borderRadius: "20px",
                fontSize: "0.85rem", fontWeight: "700",
              }}>💶 {restaurant.prix}€</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button onClick={() => onFavori(restaurant)} style={{
                padding: "8px", borderRadius: "8px", border: "none",
                backgroundColor: estFavori ? "#ff6b6b" : "#4dabf7",
                color: "white", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
              }}>
                {estFavori ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setEnEdition(true)} style={{
                  flex: 1, padding: "8px", backgroundColor: "#ffa94d",
                  color: "white", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "600", fontSize: "0.85rem",
                }}>✏️ Modifier</button>
                <button onClick={() => onSupprimer(restaurant.id)} style={{
                  flex: 1, padding: "8px", backgroundColor: "#ff6b6b",
                  color: "white", border: "none", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "600", fontSize: "0.85rem",
                }}>🗑️ Supprimer</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}