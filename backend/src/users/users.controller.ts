import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersRequestDto } from './dto/users-request-dto';
import { UsersDto } from './dto/users-dto';
import { UserErrorDto } from './dto/user-error-response-dto';

@ApiTags('usersController')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: UsersDto,
    description: 'User Found',
  })
  @ApiNotFoundResponse({
    type: UserErrorDto,
    description: 'User Not Found',
  })
  @Post()
  getUser(@Body() body: UsersRequestDto): UsersDto {
    return this.usersService.getUsers(body.email);
  }
}
