import { RestaurantService } from "../services/restaurantService";
import { InMemoryRestaurantRepository } from "../repositories/InMemoryRestaurantRepository";
import { InMemoryFavorisRepository } from "../repositories/InMemoryFavorisRepository";
import { BarycentreScoring, normaliser } from "../patterns/scoring/BarycentreScoring";
import { restaurantsMock } from "../mocks/restaurants";

describe("RestaurantService", () => {
  let service: RestaurantService;
  let favorisRepo: InMemoryFavorisRepository;
  let repo: InMemoryRestaurantRepository;

  beforeEach(async () => {
    repo = new InMemoryRestaurantRepository();
    favorisRepo = new InMemoryFavorisRepository();
    await favorisRepo.clear();
    service = new RestaurantService(repo, favorisRepo);
  });

  it("avec 1 favori, ce restaurant est en tête avec score 1", async () => {
    await favorisRepo.add(2);
    const recos = await service.recommander();
    expect(recos[0].nom).toBe("Tokyo Ramen");
    expect(recos[0].score).toBe(1);
  });

  it("un resto très proche d'un favori a un score quasi maximal", async () => {
    await favorisRepo.add(2); // Tokyo
    const clone = await service.create({
      nom: "Clone Proche",
      cuisine: "Japonais",
      note: 4.8,
      prix: 15,
      ville: "Lyon",
      categorieId: 2,
      popularite: 92,
      distance: 0.8,
    });

    const recos = await service.recommander();
    const tokyo = recos.find(r => r.nom === "Tokyo Ramen")!;
    const cloneR = recos.find(r => r.id === clone.id)!;
    expect(cloneR.score).toBeGreaterThanOrEqual(0.95);
    expect(Math.abs(cloneR.score - tokyo.score)).toBeLessThanOrEqual(0.05);
  });

  it("un resto proche mais cher ne doit pas battre un favori similaire", async () => {
    await favorisRepo.add(2); // Tokyo : proche + pas cher
    const cher = await service.create({
      nom: "Proche Mais Cher",
      cuisine: "Japonais",
      note: 5,
      prix: 80,
      ville: "Paris",
      categorieId: 2,
      popularite: 99,
      distance: 0.3,
    });

    const recos = await service.recommander();
    const tokyo = recos.find(r => r.nom === "Tokyo Ramen")!;
    const cherR = recos.find(r => r.id === cher.id)!;
    expect(tokyo.score).toBeGreaterThan(cherR.score);
  });

  it("recommande sans favoris (profil idéal)", async () => {
    const recos = await service.recommander();
    expect(recos.length).toBeGreaterThan(0);
    expect(recos[0].score).toBeGreaterThanOrEqual(recos[recos.length - 1].score);
  });
});

describe("BarycentreScoring", () => {
  const scoring = new BarycentreScoring();

  it("calcule un barycentre tiré vers le favori le mieux noté", () => {
    const bornes = scoring.calculerBornes(restaurantsMock);
    const favoris = [restaurantsMock[1], restaurantsMock[4]];
    const profil = scoring.calculerProfil(favoris, bornes);
    const xTokyo = normaliser(restaurantsMock[1], bornes);
    const xSushi = normaliser(restaurantsMock[4], bornes);
    expect(Math.abs(profil[0] - xTokyo[0])).toBeLessThanOrEqual(Math.abs(profil[0] - xSushi[0]) + 0.001);
  });

  it("score = 1 pour un resto égal à son propre profil", () => {
    const bornes = scoring.calculerBornes(restaurantsMock);
    const profil = scoring.calculerProfil([restaurantsMock[1]], bornes);
    expect(scoring.score(restaurantsMock[1], profil, bornes, [restaurantsMock[1]])).toBe(1);
  });
});
