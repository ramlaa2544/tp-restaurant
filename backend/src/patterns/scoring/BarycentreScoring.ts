import { Restaurant } from "../../types/restaurant";

export interface IScoring {
  score(restaurant: Restaurant, profil: number[]): number;
}

export class BarycentreScoring implements IScoring {
  score(restaurant: Restaurant, profil: number[]): number {
    const noteNorm = restaurant.note / 5;
    const prixNorm = 1 - restaurant.prix / 100;
    const populariteNorm = restaurant.popularite / 100;
    const distanceNorm = 1 - restaurant.distance / 10;

    const attributs = [noteNorm, prixNorm, populariteNorm, distanceNorm];

    let distance = 0;
    for (let i = 0; i < attributs.length; i++) {
      distance += Math.pow(attributs[i] - profil[i], 2);
    }

    return 1 / (1 + Math.sqrt(distance));
  }
}