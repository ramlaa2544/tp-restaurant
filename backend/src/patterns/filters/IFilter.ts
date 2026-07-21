import { Restaurant } from "../../types/restaurant";

export interface IFilter {
  filter(restaurant: Restaurant): boolean;
}