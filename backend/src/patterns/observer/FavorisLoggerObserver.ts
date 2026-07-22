import { FavorisEvent, IFavorisObserver } from "./FavorisSubject";

/**
 * Observer concret — journalise les changements de favoris.
 */
export class FavorisLoggerObserver implements IFavorisObserver {
  update(event: FavorisEvent): void {
    const id = event.restaurantId !== undefined ? ` #${event.restaurantId}` : "";
    console.log(`[Favoris] ${event.type}${id} @ ${event.timestamp.toISOString()}`);
  }
}
