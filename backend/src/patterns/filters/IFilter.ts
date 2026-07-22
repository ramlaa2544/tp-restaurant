import { Restaurant } from "../../types/restaurant";

/** Stratégie de filtre (utilisée dans la Chain of Responsibility) */
export interface IFilter {
  filter(restaurant: Restaurant): boolean;
}
