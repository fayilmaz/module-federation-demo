import { Announcement } from 'src/commonDto/AnnouncementList';
import { ErrorMessage } from 'src/commonDto/ErrorWithMessage';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entitity';

export class LoginDto {
  @ApiProperty({ example: [] })
  announcementList: Announcement[] | [];
  @ApiProperty({
    example: {
      user: { email: 'example@example.com', name: 'null' },
      access_token: 'access_token_string',
    },
  })
  data:
    | {
        user: User;
        access_token: string;
      }
    | Record<string, never>;
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ type: ErrorMessage, example: null })
  error: ErrorMessage | null;
}
