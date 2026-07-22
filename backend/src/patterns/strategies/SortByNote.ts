import { ISortStrategy } from "./ISortStrategy";
import { Restaurant } from "../../types/restaurant";

/** Strategy concrète — tri par note décroissante */
export class SortByNote implements ISortStrategy {
  sort(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => b.note - a.note);
  }
}
