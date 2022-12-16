import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt_secret'),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = this.userService.getUserById(jwtPayload.sub);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}