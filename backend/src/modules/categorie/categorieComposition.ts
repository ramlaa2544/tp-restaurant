import { isMock } from "../../config/dataSource";
import { InMemoryCategorieRepository } from "./repositories/InMemoryCategorieRepository";
import { SqlCategorieRepository } from "./repositories/SqlCategorieRepository";
import { CategorieService } from "./services/categorieService";
import { CategorieController } from "./controllers/categorieController";

const repo = isMock()
  ? new InMemoryCategorieRepository()
  : new SqlCategorieRepository();

const service = new CategorieService(repo);
const controller = new CategorieController(service);

export default controller;