import { IMenuRepository } from "../repositories/IMenuRepository";
import { MenuRequest, MenuUpdateRequest } from "../types/menu";

export class MenuService {
  constructor(private repo: IMenuRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  async getById(id: number) {
    const menu = await this.repo.findById(id);
    if (!menu) throw new Error("Menu non trouvé");
    return menu;
  }

  getByRestoId(restoId: number) {
    return this.repo.findByRestoId(restoId);
  }

  create(data: MenuRequest) {
    return this.repo.create(data);
  }

  async update(id: number, data: MenuUpdateRequest) {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error("Menu non trouvé");
    return updated;
  }

  async delete(id: number) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error("Menu non trouvé");
    return { success: true };
  }
}