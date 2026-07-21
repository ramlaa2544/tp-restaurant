import { ISortStrategy } from "./ISortStrategy";
import { Restaurant } from "../../types/restaurant";

export class SortByNote implements ISortStrategy {
  sort(restaurants: Restaurant[]): Restaurant[] {
    return [...restaurants].sort((a, b) => b.note - a.note);
  }
}