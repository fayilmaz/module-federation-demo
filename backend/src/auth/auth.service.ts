import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(@Body() body: signInDto): Promise<any> {
    const user = await this.usersService.findOneUser(body.email);
    const isPassMatches = bcrypt.compare(body.password, user.password);
    if (!user || !isPassMatches) {
      throw new UnauthorizedException();
    }
    const payload = { user: { id: body.email } };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
