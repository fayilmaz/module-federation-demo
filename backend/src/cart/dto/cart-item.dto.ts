import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty()
  pokemonId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}
