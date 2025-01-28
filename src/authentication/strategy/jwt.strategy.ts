import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AccessTokenPayload } from '../types/access-token-payload.types';
import { Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}