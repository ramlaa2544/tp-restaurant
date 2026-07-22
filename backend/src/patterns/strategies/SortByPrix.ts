import { ISortStrategy } from "./ISortStrategy";
import { Restaurant } from "../../types/restaurant";

/** Strategy concrète — tri par prix croissant */
export class SortByPrix implements ISortStrategy {
  sort(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => a.prix - b.prix);
  }
}
