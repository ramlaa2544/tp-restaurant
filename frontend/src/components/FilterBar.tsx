interface Props {
  prixMax: string;
  cuisine: string;
  triPar: string;
  onPrixMax: (val: string) => void;
  onCuisine: (val: string) => void;
  onTriPar: (val: string) => void;
  onSearch: () => void;
  onScoring: () => void;
}

export function FilterBar({
  prixMax, cuisine, triPar,
  onPrixMax, onCuisine, onTriPar,
  onSearch, onScoring,
}: Props) {
  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    }}>
      <h3 style={{ margin: "0 0 16px 0", color: "#333", fontSize: "1rem" }}>
        🔍 Filtrer et trier
      </h3>

      <div style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <input
          type="number"
          placeholder="Prix max (€)"
          value={prixMax}
          onChange={e => onPrixMax(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e0e0e0",
            fontSize: "0.9rem",
            outline: "none",
            flex: "1",
            minWidth: "130px",
          }}
        />

        <input
          type="text"
          placeholder="Cuisine (ex: Japonais)"
          value={cuisine}
          onChange={e => onCuisine(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e0e0e0",
            fontSize: "0.9rem",
            outline: "none",
            flex: "1",
            minWidth: "160px",
          }}
        />

        <select
          value={triPar}
          onChange={e => onTriPar(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #e0e0e0",
            fontSize: "0.9rem",
            outline: "none",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="note">⭐ Trier par note</option>
          <option value="prix">💶 Trier par prix</option>
        </select>

        <button
          onClick={onSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "0.9rem",
          }}
        >
          🔍 Rechercher
        </button>

        <button
          onClick={onScoring}
          style={{
            padding: "10px 20px",
            backgroundColor: "#51cf66",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "0.9rem",
          }}
        >
          ⭐ Recommandations
        </button>
      </div>
    </div>
  );
}