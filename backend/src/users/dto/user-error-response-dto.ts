import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entitity';
import { Announcement } from 'src/commonDto/AnnouncementList';

export class UserErrorDto {
  @ApiProperty({
    type: Announcement,
    example: [{ code: 'PS012', message: 'user not found' }],
  })
  announcementList: Announcement[] | [];
  @ApiProperty({
    type: User,
    example: {},
  })
  data: Record<string, never>;
  @ApiProperty({ example: false })
  success: boolean;
  @ApiProperty({ example: { message: 'User not found.' } })
  error: { message: string } | Record<string, never>;
}
