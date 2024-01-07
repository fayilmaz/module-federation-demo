import { ApiProperty } from '@nestjs/swagger';

export class Pokemon {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  abilities: string[];
  @ApiProperty()
  height: string;
  @ApiProperty()
  weight: string;
  @ApiProperty()
  gender_ratio: { male: number; female: number };
  @ApiProperty()
  evolution: {
    pre_evolved_from: string;
    evolves_into: string | string[] | null;
  };
  @ApiProperty()
  base_stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  @ApiProperty()
  image: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  availability: string;
  @ApiProperty()
  gen: string;
}
