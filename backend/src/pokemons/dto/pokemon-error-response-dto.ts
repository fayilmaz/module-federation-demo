import { Announcement } from 'src/commonDto/AnnouncementList';
import { ErrorMessage } from 'src/commonDto/ErrorWithMessage';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonErrorResponseDto {
  @ApiProperty({
    example: [{ code: 'PS011', message: 'Pokemon could not found.' }],
  })
  announcementList: Announcement[] | [];
  @ApiProperty()
  data: Record<string, never>;
  @ApiProperty({ example: false })
  success: boolean;
  @ApiProperty({
    type: ErrorMessage,
    example: { message: 'Pokemon could not found.' },
  })
  error: ErrorMessage;
}
