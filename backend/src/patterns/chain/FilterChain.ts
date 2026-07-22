import { Restaurant } from "../../types/restaurant";
import { IFilter } from "../filters/IFilter";

/**
 * Design Pattern : Chain of Responsibility
 * Chaque maillon filtre la liste puis passe le résultat au suivant.
 */
export abstract class FilterHandler {
  private next: FilterHandler | null = null;

  setNext(handler: FilterHandler): FilterHandler {
    this.next = handler;
    return handler;
  }

  handle(restaurants: Restaurant[]): Restaurant[] {
    const filtered = this.apply(restaurants);
    if (this.next) return this.next.handle(filtered);
    return filtered;
  }

  protected abstract apply(restaurants: Restaurant[]): Restaurant[];
}

export class FilterLink extends FilterHandler {
  constructor(private filter: IFilter) {
    super();
  }

  protected apply(restaurants: Restaurant[]): Restaurant[] {
    return restaurants.filter(r => this.filter.filter(r));
  }
}

export class FilterChain {
  constructor(private head: FilterHandler | null = null) {}

  static from(filters: IFilter[]): FilterChain {
    if (filters.length === 0) return new FilterChain(null);

    const head = new FilterLink(filters[0]);
    let current: FilterHandler = head;
    for (let i = 1; i < filters.length; i++) {
      current = current.setNext(new FilterLink(filters[i]));
    }
    return new FilterChain(head);
  }

  execute(restaurants: Restaurant[]): Restaurant[] {
    if (!this.head) return restaurants;
    return this.head.handle(restaurants);
  }
}
