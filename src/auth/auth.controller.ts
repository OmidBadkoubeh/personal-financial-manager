import { Body, Controller, Post } from '@nestjs/common';

import { User } from '@src/user/entities/user.entity';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const { accessToken } = await this.authService.signIn(username, password);
    return accessToken;
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
}
