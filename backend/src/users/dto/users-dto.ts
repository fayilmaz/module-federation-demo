import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entitity';
import { Announcement } from 'src/commonDto/AnnouncementList';

export class UsersDto {
  @ApiProperty({
    type: Announcement,
    example: [{ code: 'PS001', message: 'user successfully found' }],
  })
  announcementList: Announcement[] | [];
  @ApiProperty({
    type: User,
    example: {
      id: '1',
      name: 'Ash',
      email: 'ash@mail.com',
      password: 'password',
    },
  })
  data: { user: User | Record<string, never> };
  @ApiProperty()
  success: boolean;
  @ApiProperty({ example: null })
  error: { message: string } | Record<string, never>;
}
