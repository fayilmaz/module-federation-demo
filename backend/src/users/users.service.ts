import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';
import { UserNotFoundException } from './exceptions/UserNotFoundException';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {}

  async getUserByEmail(userEmail: string): Promise<UserDto> {
    const users = await this.UserModel.find();
    const userFromDb = users.find((user) => user.email === userEmail);
    if (!userFromDb) {
      throw new UserNotFoundException();
    }
    const { _id, name, email, password } = userFromDb;
    const user = { id: _id.toString(), name, email };
    return {
      announcementList: [],
      data: {
        user,
      },
      success: true,
      error: null,
    };
  }

  async addUser(user: CreateUserDto): Promise<UserDto> {
    const newUser = await this.UserModel.create(user);
    if (newUser) {
      const { _id, name, email } = newUser;
      return {
        announcementList: [
          { code: 'PS001', message: 'User successfully created' },
        ],
        data: {
          user: {
            id: _id.toString(),
            name,
            email,
          },
        },
        success: true,
        error: null,
      };
    }
  }
}
