import { isMock } from "../config/dataSource";
import { MenuController } from "../controllers/menuController";
import { InMemoryMenuRepository } from "../repositories/InMemoryMenuRepository";
import { SqlMenuRepository } from "../repositories/SqlMenuRepository";
import { MenuService } from "../services/menuService";

const repo = isMock()
  ? new InMemoryMenuRepository()
  : new SqlMenuRepository();

const service = new MenuService(repo);
const controller = new MenuController(service);

export default controller;