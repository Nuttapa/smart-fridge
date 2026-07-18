import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';


@Controller('ingredients')
export class IngredientController {


  constructor(
    private readonly ingredientService: IngredientService
  ) {}



  @Get()
  getIngredients(){

    return this.ingredientService.getIngredients();

  }




  @Get("expiring")
  getExpiringIngredients(){

    return this.ingredientService.getExpiringIngredients();

  }




  @Get("expired")
  getExpiredIngredients(){

    return this.ingredientService.getExpiredIngredients();

  }





  @Post()
  addIngredient(
    @Body() ingredient:any
  ){

    return this.ingredientService.addIngredient(ingredient);

  }





  @Put(":id")
  updateIngredient(
    @Param("id") id:string,
    @Body() data:any
  ){

    return this.ingredientService.updateIngredient(
      id,
      data
    );

  }





  @Delete(":id")
  deleteIngredient(
    @Param("id") id:string
  ){

    return this.ingredientService.deleteIngredient(id);

  }


}