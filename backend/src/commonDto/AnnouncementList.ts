import { ApiProperty } from '@nestjs/swagger';
export class Announcement {
  @ApiProperty()
  code: string;
  @ApiProperty()
  message: string;
}

export class AnnouncementList {
  announcementList: Announcement[] | [];
}
