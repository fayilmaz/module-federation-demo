import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersRequestDto } from './dto/users-request-dto';
import { UserDto } from './dto/user-dto';
import { UserErrorDto } from './dto/user-error-response-dto';
import { CreateUserDto } from './dto/create-user-dto';

@ApiTags('usersController')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: UserDto,
    description: 'User Found',
  })
  @ApiNotFoundResponse({
    type: UserErrorDto,
    description: 'User Not Found',
  })
  @Post()
  getUser(@Body() body: UsersRequestDto): Promise<UserDto> {
    return this.usersService.getUserByEmail(body.email);
  }

  @Post('/create')
  addUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.usersService.addUser(body);
  }
}
