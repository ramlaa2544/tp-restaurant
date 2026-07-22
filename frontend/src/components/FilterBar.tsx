interface Props {
  prixMax: string;
  cuisine: string;
  triPar: string;
  distanceMax: string;
  populariteMin: string;
  onPrixMax: (val: string) => void;
  onCuisine: (val: string) => void;
  onTriPar: (val: string) => void;
  onDistanceMax: (val: string) => void;
  onPopulariteMin: (val: string) => void;
  onSearch: () => void;
  onScoring: () => void;
  onFavoris: () => void;
}

export function FilterBar({
  prixMax, cuisine, triPar, distanceMax, populariteMin,
  onPrixMax, onCuisine, onTriPar, onDistanceMax, onPopulariteMin,
  onSearch, onScoring, onFavoris,
}: Props) {
  return (
    <div style={{
      backgroundColor: "white", borderRadius: "16px", padding: "20px",
      marginBottom: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    }}>
      <h3 style={{ margin: "0 0 16px 0", color: "#333", fontSize: "1rem" }}>
        🔍 Filtrer et trier
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <input type="number" placeholder="Prix max (€)" value={prixMax}
          onChange={e => onPrixMax(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }} />

        <input type="text" placeholder="Cuisine (ex: Japonais)" value={cuisine}
          onChange={e => onCuisine(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }} />

        <input type="number" placeholder="Distance max (km)" value={distanceMax}
          onChange={e => onDistanceMax(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }} />

        <input type="number" placeholder="Popularité min (%)" value={populariteMin}
          onChange={e => onPopulariteMin(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem" }} />
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <select value={triPar} onChange={e => onTriPar(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "0.9rem", backgroundColor: "white" }}>
          <option value="note">⭐ Trier par note</option>
          <option value="prix">💶 Trier par prix</option>
        </select>

        <button onClick={onSearch} style={{
          padding: "10px 20px", backgroundColor: "#667eea", color: "white",
          border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700",
        }}>
          🔍 Rechercher
        </button>

        <button onClick={onFavoris} style={{
          padding: "10px 20px", backgroundColor: "#ff6b6b", color: "white",
          border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700",
        }}>
          ❤️ Mes favoris
        </button>

        <button onClick={onScoring} style={{
          padding: "10px 20px", backgroundColor: "#51cf66", color: "white",
          border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700",
        }}>
          ✨ Recommandations
        </button>
      </div>
    </div>
  );
}
