import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';

import { JwtAuthGuard } from './jwt-auth.guard';


@Module({

  imports: [

    UsersModule,

    ConfigModule,

    PassportModule,

    JwtModule.registerAsync({

      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({

        secret:
          configService.get<string>('JWT_SECRET') 
          || 'smart-fridge-super-secret-2026',

        signOptions: {

          expiresIn: '7d',

        },

      }),

    }),

  ],


  controllers: [

    AuthController

  ],


  providers: [

    AuthService,

    JwtStrategy,

    JwtAuthGuard

  ],


  exports:[

    JwtModule

  ]

})

export class AuthModule {}