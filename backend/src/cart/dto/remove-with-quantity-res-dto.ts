import { ApiProperty } from '@nestjs/swagger';
import { BaseSuccessResponseDto } from 'commonDto/base-success-response-dto';
import { Announcement } from 'src/commonDto/AnnouncementList';

export class RemoveWithQuantityResDto extends BaseSuccessResponseDto {
  @ApiProperty({
    required: true,
    example: {},
  })
  data: Record<string, never> = {};

  @ApiProperty({ example: [] })
  announcementList: Announcement[] | [];

  constructor(
    announcementList: Announcement[] | [] = [],
    data: Record<string, never> = {},
  ) {
    super();
    this.announcementList = announcementList;
    this.data = data;
  }
}
