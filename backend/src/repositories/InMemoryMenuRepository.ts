import { IMenuRepository } from "./IMenuRepository";
import { Menu, MenuRequest, MenuUpdateRequest } from "../types/menu";
import { menusMock } from "../mocks/menus";

export class InMemoryMenuRepository implements IMenuRepository {

  async findAll(): Promise<Menu[]> {
    return menusMock;
  }

  async findById(id: number): Promise<Menu | null> {
    return menusMock.find(m => m.id === id) ?? null;
  }

  async findByRestoId(restoId: number): Promise<Menu[]> {
    return menusMock.filter(m => m.restoId === restoId);
  }

  async create(data: MenuRequest): Promise<Menu> {
    const newMenu: Menu = { id: menusMock.length + 1, ...data };
    menusMock.push(newMenu);
    return newMenu;
  }

  async update(id: number, data: MenuUpdateRequest): Promise<Menu | null> {
    const index = menusMock.findIndex(m => m.id === id);
    if (index === -1) return null;
    menusMock[index] = { ...menusMock[index], ...data };
    return menusMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = menusMock.findIndex(m => m.id === id);
    if (index === -1) return false;
    menusMock.splice(index, 1);
    return true;
  }
}