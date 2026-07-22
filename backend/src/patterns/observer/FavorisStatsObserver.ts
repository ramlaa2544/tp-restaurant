import { FavorisEvent, IFavorisObserver } from "./FavorisSubject";

/**
 * Observer concret — compte les ajouts/retraits de favoris.
 */
export class FavorisStatsObserver implements IFavorisObserver {
  private ajouts = 0;
  private retraits = 0;
  private vidages = 0;

  update(event: FavorisEvent): void {
    if (event.type === "ajoute") this.ajouts++;
    if (event.type === "retire") this.retraits++;
    if (event.type === "vide") this.vidages++;
  }

  getStats() {
    return {
      ajouts: this.ajouts,
      retraits: this.retraits,
      vidages: this.vidages,
      net: this.ajouts - this.retraits,
    };
  }
}
