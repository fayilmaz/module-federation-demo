import { ApiProperty } from '@nestjs/swagger';

export class UsersRequestDto {
  @ApiProperty()
  email: string;
}
