import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonErrorException extends HttpException {
  constructor(error: Error = null) {
    super(
      {
        announcementList: [],
        data: {},
        success: false,
        error: {
          content: error,
          message: 'Something went wrong',
        },
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
