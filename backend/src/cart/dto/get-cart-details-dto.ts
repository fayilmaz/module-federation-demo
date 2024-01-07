import { ApiProperty } from '@nestjs/swagger';

export class GetCartDetailsReqDto {
  @ApiProperty({ example: 'example@example.com' })
  userId: string;
}
