import { RechercheFactory } from "../patterns/factory/RechercheFactory";
import { FavorisSubject } from "../patterns/observer/FavorisSubject";
import { FavorisStatsObserver } from "../patterns/observer/FavorisStatsObserver";
import { FavorisService } from "../services/favorisService";
import { InMemoryFavorisRepository } from "../repositories/InMemoryFavorisRepository";
import { SortByNote } from "../patterns/strategies/SortByNote";
import { SortByPrix } from "../patterns/strategies/SortByPrix";
import { FilterChain } from "../patterns/chain/FilterChain";
import { FilterByPrix } from "../patterns/filters/FilterByPrix";
import { FilterByCuisine } from "../patterns/filters/FilterByCuisine";
import { restaurantsMock } from "../mocks/restaurants";

describe("1. Factory", () => {
  it("crée les filtres et la stratégie de tri", () => {
    const filters = RechercheFactory.creerFiltres({
      prixMax: 20,
      cuisine: "Japonais",
      distanceMax: 2,
      populariteMin: 70,
    });
    expect(filters).toHaveLength(4);
    expect(RechercheFactory.creerTri("prix")).toBeInstanceOf(SortByPrix);
    expect(RechercheFactory.creerTri("note")).toBeInstanceOf(SortByNote);
  });
});

describe("2. Strategy", () => {
  it("trie par note ou par prix selon la stratégie", () => {
    const byNote = new SortByNote().sort(restaurantsMock);
    const byPrix = new SortByPrix().sort(restaurantsMock);
    expect(byNote[0].note).toBeGreaterThanOrEqual(byNote[1].note);
    expect(byPrix[0].prix).toBeLessThanOrEqual(byPrix[1].prix);
  });
});

describe("3. Chain of Responsibility", () => {
  it("enchaîne les filtres prix puis cuisine", () => {
    const result = FilterChain.from([
      new FilterByPrix(20),
      new FilterByCuisine("Japonais"),
    ]).execute(restaurantsMock);

    expect(result.every(r => r.prix <= 20 && r.cuisine === "Japonais")).toBe(true);
    expect(result.some(r => r.nom === "Tokyo Ramen")).toBe(true);
  });
});

describe("4. Observer", () => {
  it("notifie les observers lors des changements de favoris", async () => {
    const repo = new InMemoryFavorisRepository();
    await repo.clear();
    const service = new FavorisService(repo);
    const stats = new FavorisStatsObserver();
    service.getSubject().subscribe(stats);

    await service.ajouter(1);
    await service.ajouter(2);
    await service.supprimer(1);
    await service.vider();

    expect(stats.getStats()).toEqual({
      ajouts: 2,
      retraits: 1,
      vidages: 1,
      net: 1,
    });
  });

  it("permet de se désabonner", () => {
    const subject = new FavorisSubject();
    const stats = new FavorisStatsObserver();
    subject.subscribe(stats);
    subject.unsubscribe(stats);
    subject.notify({ type: "ajoute", restaurantId: 1, timestamp: new Date() });
    expect(stats.getStats().ajouts).toBe(0);
  });
});
