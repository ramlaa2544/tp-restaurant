import { Restaurant } from "../../types/restaurant";

export interface Bornes {
  note: { min: number; max: number };
  prix: { min: number; max: number };
  popularite: { min: number; max: number };
  distance: { min: number; max: number };
}

export interface IScoring {
  calculerBornes(restaurants: Restaurant[]): Bornes;
  calculerProfil(favoris: Restaurant[], bornes: Bornes): number[];
  score(
    restaurant: Restaurant,
    profil: number[],
    bornes: Bornes,
    favoris?: Restaurant[]
  ): number;
}

const POIDS = [0.30, 0.20, 0.20, 0.30];

const DOMAINES = {
  note: { min: 0, max: 5 },
  prix: { min: 0, max: 100 },
  popularite: { min: 0, max: 100 },
  distance: { min: 0, max: 10 },
};

function minMax(valeur: number, min: number, max: number): number {
  if (!Number.isFinite(valeur) || max === min) return 0.5;
  const n = (valeur - min) / (max - min);
  return Math.min(1, Math.max(0, n));
}

export function normaliser(restaurant: Restaurant, bornes: Bornes): number[] {
  return [
    minMax(Number(restaurant.note), bornes.note.min, bornes.note.max),
    1 - minMax(Number(restaurant.prix), bornes.prix.min, bornes.prix.max),
    minMax(Number(restaurant.popularite), bornes.popularite.min, bornes.popularite.max),
    1 - minMax(Number(restaurant.distance), bornes.distance.min, bornes.distance.max),
  ];
}

export class BarycentreScoring implements IScoring {

  calculerBornes(restaurants: Restaurant[]): Bornes {
    const notes = restaurants.map(r => Number(r.note)).filter(Number.isFinite);
    const prix = restaurants.map(r => Number(r.prix)).filter(Number.isFinite);
    const pops = restaurants.map(r => Number(r.popularite)).filter(Number.isFinite);
    const dists = restaurants.map(r => Number(r.distance)).filter(Number.isFinite);

    return {
      note: {
        min: DOMAINES.note.min,
        max: Math.max(DOMAINES.note.max, ...(notes.length ? notes : [DOMAINES.note.max])),
      },
      prix: {
        min: DOMAINES.prix.min,
        max: Math.max(DOMAINES.prix.max, ...(prix.length ? prix : [DOMAINES.prix.max])),
      },
      popularite: {
        min: DOMAINES.popularite.min,
        max: Math.max(DOMAINES.popularite.max, ...(pops.length ? pops : [DOMAINES.popularite.max])),
      },
      distance: {
        min: DOMAINES.distance.min,
        max: Math.max(DOMAINES.distance.max, ...(dists.length ? dists : [DOMAINES.distance.max])),
      },
    };
  }

  calculerProfil(favoris: Restaurant[], bornes: Bornes): number[] {
    if (favoris.length === 0) return [1, 1, 1, 1];

    const poids = favoris.map(f => Math.max(Number(f.note) || 0.01, 0.01));
    const total = poids.reduce((a, b) => a + b, 0);

    const profil = [0, 0, 0, 0];
    favoris.forEach((favori, i) => {
      const w = poids[i] / total;
      const x = normaliser(favori, bornes);
      for (let j = 0; j < 4; j++) profil[j] += w * x[j];
    });
    return profil;
  }

  score(
    restaurant: Restaurant,
    profil: number[],
    bornes: Bornes,
    favoris: Restaurant[] = []
  ): number {
    if (profil.length !== 4) return 0;

    const x = normaliser(restaurant, bornes);

    let distCarree = 0;
    for (let j = 0; j < 4; j++) {
      const d = x[j] - profil[j];
      distCarree += POIDS[j] * d * d;
    }
    let score = 1 / (1 + Math.sqrt(distCarree));

    if (favoris.length > 0) {
      const poids = favoris.map(f => Math.max(Number(f.note) || 0.01, 0.01));
      const total = poids.reduce((a, b) => a + b, 0);
      let affinite = 0;
      favoris.forEach((f, i) => {
        if (f.cuisine === restaurant.cuisine) affinite += poids[i] / total;
      });
      score = Math.min(1, score + 0.15 * affinite);
    }

    return Number.isFinite(score) ? Math.round(score * 1000) / 1000 : 0;
  }
}
