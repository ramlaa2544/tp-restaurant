import { MenuRepository } from "./menuRepository";
import { MenuService } from "./menuService";
import { MenuController } from "./menuController";

const repo = new MenuRepository();
const service = new MenuService(repo);
const controller = new MenuController(service);

export default controller;