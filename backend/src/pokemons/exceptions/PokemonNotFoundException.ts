import { HttpException, HttpStatus } from '@nestjs/common';

export class PokemonNotFoundException extends HttpException {
  constructor() {
    super(
      {
        announcementList: [
          {
            code: 'PS011',
            message: 'Pokemon could not found.',
          },
        ],
        data: {},
        success: false,
        error: {
          message: 'Pokemon could not found.',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
