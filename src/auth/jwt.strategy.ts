import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtConfig } from '@src/types';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET || config.get<JwtConfig>('jwt').secret,
    });
  }

  async validate(username: string, password: string): Promise<string> {
    return this.authService.validateUser(username, password);
  }
}
