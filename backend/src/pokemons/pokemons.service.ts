import { Injectable } from '@nestjs/common';
import * as pokemonsData from './pokemons.json';
import { PokemonsDto } from './dto/pokemons-dto';
import { PokemonDto } from './dto/pokemon-dto';
import { PokemonNotFoundException } from 'src/pokemons/exceptions/PokemonNotFoundException';
import { PokemonsNotFoundException } from 'src/pokemons/exceptions/PokemonsNotFoundException';

@Injectable()
export class PokemonsService {
  constructor() {}

  getPokemons(): PokemonsDto {
    if (!pokemonsData?.pokemons?.length) {
      throw new PokemonsNotFoundException();
    }
    return {
      announcementList: [],
      data: {
        count: pokemonsData.pokemons.length,
        nameList: pokemonsData.pokemons.map((pokemon) => pokemon.name),
        pokemons: pokemonsData.pokemons,
      },
      success: true,
      error: null,
    };
  }

  getPokemonById(id: string): PokemonDto {
    const pokemon = pokemonsData.pokemons.find((pokemon) => {
      return pokemon.id === Number(id);
    });
    if (!pokemon) {
      throw new PokemonNotFoundException();
    }
    return {
      announcementList: [],
      data: { pokemon },
      success: true,
      error: null,
    };
  }
}
