import { Menu, MenuRequest, MenuUpdateRequest } from "../types/menu";

export interface IMenuRepository {
  findAll(): Promise<Menu[]>;
  findById(id: number): Promise<Menu | null>;
  findByRestoId(restoId: number): Promise<Menu[]>;
  create(data: MenuRequest): Promise<Menu>;
  update(id: number, data: MenuUpdateRequest): Promise<Menu | null>;
  delete(id: number): Promise<boolean>;
}