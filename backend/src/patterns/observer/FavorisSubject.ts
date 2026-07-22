export type FavorisEventType = "ajoute" | "retire" | "vide";

export interface FavorisEvent {
  type: FavorisEventType;
  restaurantId?: number;
  timestamp: Date;
}

/**
 * Design Pattern : Observer
 * Subject + observers notifiés à chaque changement de favoris.
 */
export interface IFavorisObserver {
  update(event: FavorisEvent): void;
}

export class FavorisSubject {
  private observers: IFavorisObserver[] = [];

  subscribe(observer: IFavorisObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: IFavorisObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(event: FavorisEvent): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }
}
