import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PokemonDto } from './dto/pokemon-dto';
import { PokemonsDto } from './dto/pokemons-dto';
import { PokemonErrorResponseDto } from './dto/pokemon-error-response-dto';
import { PokemonsErrorResponseDto } from './dto/pokemons-error-response-dto';

@ApiTags('pokemons')
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @ApiOkResponse({ type: PokemonsDto })
  @ApiNotFoundResponse({
    type: PokemonsErrorResponseDto,
    description: 'Could Not Get Pokemons',
  })
  @Get()
  getPokemons(): PokemonsDto {
    return this.pokemonsService.getPokemons();
  }

  @ApiOkResponse({ type: PokemonDto })
  @ApiNotFoundResponse({
    type: PokemonErrorResponseDto,
    description: 'Pokemon Not Found',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'ID of the Pokemon',
  })
  @Get(':id')
  getPokemon(@Param('id') id: string): PokemonDto {
    return this.pokemonsService.getPokemonById(id);
  }
}
