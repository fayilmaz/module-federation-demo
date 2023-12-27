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
import { Public } from 'decorators/public';

@Public()
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
  async getPokemons(): Promise<PokemonsDto> {
    return this.pokemonsService.getPokemons();
  }

  @Public()
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
  getPokemon(@Param('id') id: string): Promise<PokemonDto> {
    return this.pokemonsService.getPokemonById(id);
  }
}
