import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        announcementList: [],
        data: {},
        success: false,
        error: {
          message: 'Email and password do not match.',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
