import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAndPasswordDontMatchException extends HttpException {
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
