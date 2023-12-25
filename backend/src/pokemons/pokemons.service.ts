import { Injectable } from '@nestjs/common';
import { PokemonsDto } from './dto/pokemons-dto';
import { PokemonDto } from './dto/pokemon-dto';
import { PokemonNotFoundException } from 'src/pokemons/exceptions/PokemonNotFoundException';
import { PokemonsNotFoundException } from 'src/pokemons/exceptions/PokemonsNotFoundException';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './schemas/pokemons.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name)
    private PokemonModel: mongoose.Model<Pokemon>,
  ) {}

  async getPokemons(): Promise<PokemonsDto> {
    const pokemons = await this.PokemonModel.find({}, { _id: false });

    if (!pokemons?.length) {
      throw new PokemonsNotFoundException();
    }
    return {
      announcementList: [],
      data: {
        count: pokemons.length,
        nameList: pokemons.map((pokemon) => pokemon.name),
        pokemons: pokemons,
      },
      success: true,
      error: null,
    };
  }

  async getPokemonById(id: string): Promise<PokemonDto> {
    const pokemon = await this.PokemonModel.findOne({ id }, { _id: false });
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
