import { ApiProperty } from '@nestjs/swagger';

class NullError {
  error: null;
}

export class BaseSuccessResponseDto {
  @ApiProperty({ example: true })
  success: boolean = true;

  @ApiProperty({ type: NullError, required: true, example: null })
  error: null = null;

  constructor() {
    this.error = null;
    this.success = true;
  }
}
