import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { IngredientService } from './ingredient.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('ingredients')
@UseGuards(JwtAuthGuard)
export class IngredientController {


  constructor(
    private readonly ingredientService: IngredientService
  ) {}



  @Get()
  getIngredients(
    @Req() req
  ){

    return this.ingredientService.getIngredients(
      req.user.userId
    );

  }




  @Get("expiring")
  getExpiringIngredients(
    @Req() req
  ){

    return this.ingredientService.getExpiringIngredients(
      req.user.userId
    );

  }




  @Get("expired")
  getExpiredIngredients(
    @Req() req
  ){

    return this.ingredientService.getExpiredIngredients(
      req.user.userId
    );

  }




  @Post()
  addIngredient(
    @Body() ingredient:any,
    @Req() req
  ){

    return this.ingredientService.addIngredient(
      ingredient,
      req.user.userId
    );

  }





  @Put(":id")
  updateIngredient(
    @Param("id") id:string,
    @Body() data:any,
    @Req() req
  ){

    return this.ingredientService.updateIngredient(
      id,
      data,
      req.user.userId
    );

  }





  @Delete(":id")
  deleteIngredient(
    @Param("id") id:string,
    @Req() req
  ){

    return this.ingredientService.deleteIngredient(
      id,
      req.user.userId
    );

  }


}