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

  console.log("LOGIN EMAIL =", email);
  console.log("LOGIN PASSWORD =", password);


  const user =
    await this.usersService.findByEmail(email);


  console.log("FOUND USER =", user);


  if (!user) {

    throw new UnauthorizedException(
      'User not found'
    );

  }


  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );


  console.log("PASSWORD MATCH =", isMatch);


  if (!isMatch) {

    throw new UnauthorizedException(
      'Password wrong'
    );

  }


  const payload = {
    sub:user._id.toString(),
    email:user.email,
  };


  return {
    access_token:this.jwtService.sign(payload),
    user:{
      id:user._id,
      username:user.username,
      email:user.email,
    }
  };

  }

}