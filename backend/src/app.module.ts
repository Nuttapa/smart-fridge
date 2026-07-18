import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({

      imports: [ConfigModule],

      useFactory: () => {

        console.log("MONGO URL:", process.env.MONGODB_URI);

        return {
          uri: process.env.MONGODB_URI,
        };

      },

    }), // <-- ตัวนี้หายไป

    IngredientModule,

    MenuModule,

  ],

  controllers: [
    AppController
  ],

})

export class AppModule {}