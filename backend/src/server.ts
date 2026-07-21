import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import restaurantRoutes from "./Routes/restaurantRoutes";
import menuRoutes from "./Routes/menuRoutes";
import categorieRoutes from "./Routes/categorieRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/categories", categorieRoutes);

// Servir le frontend
app.use(express.static(path.join(process.cwd(), "../frontend/dist")));
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend/dist/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});