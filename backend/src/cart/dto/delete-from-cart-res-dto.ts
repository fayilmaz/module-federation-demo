import { ApiProperty } from '@nestjs/swagger';
import { BaseSuccessResponseDto } from 'commonDto/base-success-response-dto';
import { Announcement } from 'src/commonDto/AnnouncementList';

export class DeleteFromCartResDto extends BaseSuccessResponseDto {
  @ApiProperty({
    required: true,
    example: {},
  })
  data: Record<string, never> = {};

  @ApiProperty({
    example: [{ code: 'PS001', message: 'example announcement message' }],
  })
  announcementList: Announcement[] | [];

  constructor(announcementList: Announcement[] | [] = [], data = {}) {
    super();
    this.announcementList = announcementList;
    this.data = data;
  }
}
