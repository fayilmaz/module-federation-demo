import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessage {
  @ApiProperty()
  message: string;
}

export class ErrorWithMessage {
  error: ErrorMessage | null;
}
