import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({ example: 'UP' })
  status: string;
}
