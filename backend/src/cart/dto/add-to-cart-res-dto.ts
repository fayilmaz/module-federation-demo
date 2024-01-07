import { ApiProperty } from '@nestjs/swagger';
import { Announcement } from 'src/commonDto/AnnouncementList';
import { BaseSuccessResponseDto } from 'commonDto/base-success-response-dto';

export class AddToCartResDto extends BaseSuccessResponseDto {
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
