import { Announcement } from 'src/commonDto/AnnouncementList';
import { Pokemon } from '../entities/pokemon.entity';
import { ErrorMessage } from 'src/commonDto/ErrorWithMessage';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonsDataDto {
  count: number;
  nameList: string[];
  pokemons: Pokemon[];
}

export class PokemonsDto {
  @ApiProperty({ type: Announcement })
  announcementList: Announcement[] | [];
  @ApiProperty({
    type: PokemonsDataDto,
    example: {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      description:
        'Pikachu, a Mouse Pokémon. It can generate electric attacks from the electric pouches located in both of its cheeks.',
      abilities: ['Static', 'Lightning Rod'],
      height: '0.4 m',
      weight: '6.0 kg',
      gender_ratio: {
        male: 50,
        female: 50,
      },
      evolution: {
        pre_evolved_from: 'Pichu',
        evolves_into: 'Raichu',
      },
      base_stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        special_attack: 50,
        special_defense: 50,
        speed: 90,
      },
      image: 'url_to_pikachu_image.png',
      price: '0',
      availability: 'In stock',
      gen: '1',
    },
  })
  data:
    | {
        count: number;
        nameList: string[];
        pokemons: Pokemon[];
      }
    | Record<string, never>;
  @ApiProperty()
  success: boolean;
  @ApiProperty({ type: ErrorMessage, example: null })
  error: ErrorMessage | null;
}
