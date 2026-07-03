import { CategorieRepository } from "./categorieRepository";
import { CategorieService } from "./categorieService";
import { CategorieController } from "./categorieController";

const repo = new CategorieRepository();
const service = new CategorieService(repo);
const controller = new CategorieController(service);

export default controller;