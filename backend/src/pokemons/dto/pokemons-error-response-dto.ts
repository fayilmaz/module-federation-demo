import { Announcement } from 'src/commonDto/AnnouncementList';
import { ErrorMessage } from 'src/commonDto/ErrorWithMessage';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonsErrorResponseDto {
  @ApiProperty({
    example: [{ code: 'PS010', message: 'Could not get pokemons' }],
  })
  announcementList: Announcement[] | [];
  @ApiProperty()
  data: Record<string, never>;
  @ApiProperty({ example: false })
  success: boolean;
  @ApiProperty({
    type: ErrorMessage,
    example: { message: 'Could not get pokemons' },
  })
  error: ErrorMessage;
}
