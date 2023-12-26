import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        announcementList: [],
        data: {},
        success: false,
        error: {
          message: 'User already exists',
        },
      },
      HttpStatus.CONFLICT,
    );
  }
}
