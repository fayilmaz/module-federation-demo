import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        announcementList: [
          {
            code: 'PS009',
            message: 'User not found.',
          },
        ],
        data: {},
        success: false,
        error: {
          message: 'User not found.',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
