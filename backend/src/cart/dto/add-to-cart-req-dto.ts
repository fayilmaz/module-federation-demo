import { ApiProperty } from '@nestjs/swagger';

export class AddToCartReqDto {
  @ApiProperty({ required: true, example: 'example@example.com' })
  userEmail: string;
  @ApiProperty({ required: true, example: '65952533d8626f5599e0dc00' })
  cartId: string;
  @ApiProperty({ required: true, example: 25 })
  pokemonId: number;
  @ApiProperty({ required: true, example: 'Pikachu' })
  name: string;
  @ApiProperty({ required: true, example: 1 })
  quantity: number;
}
