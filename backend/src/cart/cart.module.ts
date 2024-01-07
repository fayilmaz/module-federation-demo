import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonSchema } from 'src/pokemons/schemas/pokemons.schema';
import { CartSchema } from './schemas/cart.schema';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    PokemonsModule,
    MessageModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
