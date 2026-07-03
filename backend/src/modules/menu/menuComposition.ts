import { isMock } from "../../config/dataSource";
import { InMemoryMenuRepository } from "./repositories/InMemoryMenuRepository";
import { SqlMenuRepository } from "./repositories/SqlMenuRepository";
import { MenuService } from "./services/menuService";
import { MenuController } from "./controllers/menuController";

const repo = isMock()
  ? new InMemoryMenuRepository()
  : new SqlMenuRepository();

const service = new MenuService(repo);
const controller = new MenuController(service);

export default controller;