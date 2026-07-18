import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor() {

    super({

      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration:false,

      secretOrKey:
        'smart-fridge-super-secret-2026',

    });

  }


  async validate(payload:any){

    return {
      userId: payload.sub,
      email: payload.email,
    };

  }

}