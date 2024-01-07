import { ApiProperty } from '@nestjs/swagger';
import { Announcement } from 'src/commonDto/AnnouncementList';

export class ErrorObject {
  @ApiProperty()
  message: string;

  @ApiProperty()
  detail?: string;
}

export class BaseErrorResponseDto {
  @ApiProperty({
    type: [Announcement] || [],
    required: true,
    example: [{ code: 'PS0001', message: 'related announcement message' }],
  })
  announcementList: Announcement[] | [];

  @ApiProperty({ example: {} })
  data: Record<string, never> = {};

  @ApiProperty({ example: false })
  success: boolean = false;

  @ApiProperty({
    type: ErrorObject,
    required: true,
    example: { message: 'Error message example' },
  })
  error: ErrorObject;

  constructor(
    announcementList: Announcement[] | [] = [],
    errorMessage: string,
  ) {
    this.announcementList = announcementList;
    this.error = { message: errorMessage };
  }
}
