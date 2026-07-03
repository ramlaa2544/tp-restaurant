import { RestaurantService } from "../services/restaurantService";
import { InMemoryRestaurantRepository } from "../repositories/InMemoryRestaurantRepository";

describe("RestaurantService", () => {
  let service: RestaurantService;

  beforeEach(() => {
    const repo = new InMemoryRestaurantRepository();
    service = new RestaurantService(repo);
  });

  it("doit retourner tous les restaurants", async () => {
    const restaurants = await service.getAll();
    expect(restaurants.length).toBeGreaterThan(0);
  });

  it("doit retourner un restaurant par son id", async () => {
    const restaurant = await service.getById(1);
    expect(restaurant).toBeDefined();
    expect(restaurant.id).toBe(1);
  });

  it("doit retourner une erreur si le restaurant n'existe pas", async () => {
    await expect(service.getById(999)).rejects.toThrow("Restaurant non trouvé");
  });

  it("doit créer un nouveau restaurant", async () => {
    const newResto = await service.create({
      nom: "Test Resto",
      cuisine: "Test",
      note: 4.0,
      prix: 20,
      ville: "Paris",
      categorieId: 1,
    });
    expect(newResto.nom).toBe("Test Resto");
  });
});