import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';

import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    return this.usersService.validateUser(username, password);
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, password, email, phone } = signUpDto;
    const user = await this.usersService.createUser({
      username,
      password,
      email,
      phone,
    });

    return user;
  }

  async signIn(username: string, password: string) {
    const foundUsername = await this.validateUser(username, password);

    if (!foundUsername) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { username: foundUsername };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
