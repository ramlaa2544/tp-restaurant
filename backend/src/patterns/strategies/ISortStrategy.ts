import { Restaurant } from "../../types/restaurant";

/**
 * Design Pattern : Strategy
 * Interface pour les algorithmes de tri interchangeables.
 */
export interface ISortStrategy {
  sort(restaurants: Restaurant[]): Restaurant[];
}
