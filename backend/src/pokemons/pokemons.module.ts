import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from './schemas/pokemons.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
