import { IFilter } from "./IFilter";
import { Restaurant } from "../../types/restaurant";

export class FilterByDistance implements IFilter {
  constructor(private distanceMax: number) {}

  filter(restaurant: Restaurant): boolean {
    return restaurant.distance <= this.distanceMax;
  }
}