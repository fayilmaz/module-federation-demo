import { ApiProperty } from '@nestjs/swagger';

export class RemoveWithQuantityDto {
  @ApiProperty()
  userEmail: string;
  @ApiProperty()
  cartId: string;
  @ApiProperty()
  pokemonId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  quantity: number;
}
