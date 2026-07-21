import { Restaurant } from "../../types/restaurant";

export interface ISortStrategy {
  sort(restaurants: Restaurant[]): Restaurant[];
}