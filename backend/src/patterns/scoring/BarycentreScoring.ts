import { Restaurant } from "../../types/restaurant";

export interface IScoring {
  score(restaurant: Restaurant, profil: number[]): number;
}

export class BarycentreScoring implements IScoring {
  score(restaurant: Restaurant, profil: number[]): number {
    const noteNorm = restaurant.note / 5;
    const prixNorm = 1 - restaurant.prix / 100;

    // Poids : note compte 40%, prix compte 60%
    const poids = [0.4, 0.6];

    let distance = 0;
    for (let i = 0; i < poids.length; i++) {
      distance += poids[i] * Math.pow([noteNorm, prixNorm][i] - profil[i], 2);
    }

    return 1 / (1 + Math.sqrt(distance));
  }
}