import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./Routes/restaurantRoutes";
import menuRoutes from "./Routes/menuRoutes";
import categorieRoutes from "./Routes/categorieRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/categories", categorieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});