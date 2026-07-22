/**
 * Design Pattern : Factory
 * Centralise la création des filtres et des stratégies de tri.
 */
import { IFilter } from "../filters/IFilter";
import { FilterByPrix } from "../filters/FilterByPrix";
import { FilterByCuisine } from "../filters/FilterByCuisine";
import { FilterByDistance } from "../filters/FilterByDistance";
import { FilterByPopularite } from "../filters/FilterByPopularite";
import { ISortStrategy } from "../strategies/ISortStrategy";
import { SortByNote } from "../strategies/SortByNote";
import { SortByPrix } from "../strategies/SortByPrix";
import { FilterChain } from "../chain/FilterChain";

export interface CritereRecherche {
  prixMax?: string | number;
  cuisine?: string;
  distanceMax?: string | number;
  populariteMin?: string | number;
  triPar?: string;
}

export class RechercheFactory {
  static creerFiltres(criteres: CritereRecherche): IFilter[] {
    const filters: IFilter[] = [];

    if (criteres.prixMax !== undefined && criteres.prixMax !== "") {
      filters.push(new FilterByPrix(Number(criteres.prixMax)));
    }
    if (criteres.cuisine) {
      filters.push(new FilterByCuisine(String(criteres.cuisine)));
    }
    if (criteres.distanceMax !== undefined && criteres.distanceMax !== "") {
      filters.push(new FilterByDistance(Number(criteres.distanceMax)));
    }
    if (criteres.populariteMin !== undefined && criteres.populariteMin !== "") {
      filters.push(new FilterByPopularite(Number(criteres.populariteMin)));
    }

    return filters;
  }

  static creerChaineFiltres(criteres: CritereRecherche): FilterChain {
    return FilterChain.from(RechercheFactory.creerFiltres(criteres));
  }

  static creerTri(triPar?: string): ISortStrategy {
    if (triPar === "prix") return new SortByPrix();
    return new SortByNote();
  }
}
