import { HttpException, HttpStatus } from '@nestjs/common';

export class PokemonsNotFoundException extends HttpException {
  constructor() {
    super(
      {
        announcementList: [
          {
            code: 'PS010',
            message: 'Pokemons could not found.',
          },
        ],
        data: {},
        success: false,
        error: {
          message: 'Pokemons could not found.',
        },
      },
      HttpStatus.OK,
    );
  }
}
