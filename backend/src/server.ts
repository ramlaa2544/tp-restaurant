import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import restaurantRoutes from "./Routes/restaurantRoutes";
import menuRoutes from "./Routes/menuRoutes";
import categorieRoutes from "./Routes/categorieRoutes";
import favorisRoutes from "./Routes/favorisRoutes";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
}));
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/menus", menuRoutes);
app.use("/categories", categorieRoutes);
app.use("/favoris", favorisRoutes);

const distPath = path.join(process.cwd(), "../frontend/dist");
const indexHtml = path.join(distPath, "index.html");

if (fs.existsSync(indexHtml)) {
  app.use(express.static(distPath));
  app.get("/{*path}", (_req, res) => {
    res.sendFile(indexHtml);
  });
} else {
  app.get("/", (_req, res) => {
    res.json({
      message: "API Restaurant démarrée. Frontend Vite : http://localhost:5173",
      dataSource: process.env.DATA_SOURCE || "sql",
    });
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Source de données : ${process.env.DATA_SOURCE || "sql"}`);
  if (!fs.existsSync(indexHtml)) {
    console.log(`Frontend (dev) : http://localhost:5173`);
  }
});
