import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import { EmailAndPasswordDontMatchException } from './exceptions/EmailAndPasswordDontMatchException';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(@Body() body: signInDto): Promise<LoginDto> {
    const user = await this.usersService.findOneUser(body.email);
    if (user) {
      const isPassMatches = await bcrypt.compare(body.password, user.password);
      if (isPassMatches) {
        const payload = { user: { id: body.email } };
        return {
          announcementList: [],
          data: {
            user: { email: user.email, name: null },
            access_token: await this.jwtService.signAsync(payload),
          },
          success: true,
          error: null,
        };
      }
    } else {
      throw new EmailAndPasswordDontMatchException();
    }
  }
}
