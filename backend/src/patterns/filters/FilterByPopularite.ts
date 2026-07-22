import { IFilter } from "./IFilter";
import { Restaurant } from "../../types/restaurant";

export class FilterByPopularite implements IFilter {
  constructor(private populariteMin: number) {}

  filter(restaurant: Restaurant): boolean {
    return restaurant.popularite >= this.populariteMin;
  }
}