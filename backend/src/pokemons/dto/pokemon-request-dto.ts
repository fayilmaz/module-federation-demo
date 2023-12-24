import { ApiProperty } from '@nestjs/swagger';

export class PokemonReqDto {
  @ApiProperty()
  id: string;
}
