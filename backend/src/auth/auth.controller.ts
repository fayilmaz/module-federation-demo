import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in-dto';
import { Public } from 'decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: signInDto) {
    return this.authService.signIn(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
