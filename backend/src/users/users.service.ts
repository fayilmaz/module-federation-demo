import { Injectable } from '@nestjs/common';
import { UsersDto } from './dto/users-dto';
import { UserNotFoundException } from './exceptions/UserNotFoundException';

@Injectable()
export class UsersService {
  constructor() {}

  getUsers(email: string): UsersDto {
    const users = [
      {
        id: '1',
        name: 'test',
        email: 'test@mail.com',
        password: 'test-password',
      },
      {
        id: '2',
        name: 'test2',
        email: 'test2@mail.com',
        password: 'test2-password',
      },
    ];
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return {
      announcementList: [],
      data: {
        user,
      },
      success: true,
      error: null,
    };
  }
}
