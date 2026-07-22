import { IFilter } from "./IFilter";
import { Restaurant } from "../../types/restaurant";

export class FilterByPrix implements IFilter {
  constructor(private prixMax: number) {}

  filter(restaurant: Restaurant): boolean {
    return restaurant.prix <= this.prixMax;
  }
}