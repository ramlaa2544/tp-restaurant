import { IFilter } from "./IFilter";
import { Restaurant } from "../../types/restaurant";

export class FilterByCuisine implements IFilter {
  constructor(private cuisine: string) {}

  filter(restaurant: Restaurant): boolean {
    return restaurant.cuisine.toLowerCase() === this.cuisine.toLowerCase();
  }
}