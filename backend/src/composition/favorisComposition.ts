import { isMock } from "../config/dataSource";
import { FavorisController } from "../controllers/favorisController";
import { InMemoryFavorisRepository } from "../repositories/InMemoryFavorisRepository";
import { SqlFavorisRepository } from "../repositories/SqlFavorisRepository";
import { FavorisService } from "../services/favorisService";
import { FavorisLoggerObserver } from "../patterns/observer/FavorisLoggerObserver";
import { FavorisStatsObserver } from "../patterns/observer/FavorisStatsObserver";

const favorisRepo = isMock()
  ? new InMemoryFavorisRepository()
  : new SqlFavorisRepository();

const service = new FavorisService(favorisRepo);

// Observer : abonnement des écouteurs au subject des favoris
const statsObserver = new FavorisStatsObserver();
service.getSubject().subscribe(new FavorisLoggerObserver());
service.getSubject().subscribe(statsObserver);

const controller = new FavorisController(service);

export { favorisRepo, statsObserver };
export default controller;
