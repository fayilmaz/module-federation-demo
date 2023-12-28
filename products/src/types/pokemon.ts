export interface IPokemon {
  id: number;
  name: string;
  type: string;
  description: string;
  abilities: string[];
  height: string;
  weight: string;
  gender_ratio: { male: number; female: number };
  evolution: {
    pre_evolved_from: string | string[];
    evolves_into: string | string[];
  };
  base_stats: {
    hp: string;
    attack: string;
    defense: string;
    special_attack: string;
    special_defence: string;
    speed: string;
  };
  image: string;
  price: number;
  availability: string;
  gen: string;
}
