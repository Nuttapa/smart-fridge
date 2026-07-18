import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}


  async register(
    username: string,
    email: string,
    password: string,
  ) {

    const existingUser =
      await this.usersService.findByEmail(email);


    if (existingUser) {

      throw new BadRequestException(
        'Email already exists'
      );

    }


    const hashedPassword =
      await bcrypt.hash(password, 10);


    return this.usersService.create({

      username,

      email,

      password: hashedPassword,

    });

  }


  async login(
    email: string,
    password: string,
  ) {

    const user =
      await this.usersService.findByEmail(email);


    if (!user) {

      throw new UnauthorizedException(
        'Invalid email or password'
      );

    }


    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isMatch) {

      throw new UnauthorizedException(
        'Invalid email or password'
      );

    }


    const payload = {
        sub: user._id.toString(),
        email: user.email,
        };


    return {

      access_token:
        this.jwtService.sign(payload),

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }

    };

  }

}