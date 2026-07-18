import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ingredient, IngredientDocument } from './schema/ingredient.schema';



@Injectable()
export class IngredientService {


  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}





  async getIngredients(userId:string) {

    return this.ingredientModel.find({
      userId:userId
    });

  }







  async addIngredient(
    ingredient:any,
    userId:string
  ) {


    ingredient.userId = userId;


    if(ingredient.expiryDate){

      ingredient.expiryDate =
        new Date(ingredient.expiryDate);

    }


    const newIngredient =
      new this.ingredientModel(ingredient);


    return newIngredient.save();

  }








  async deleteIngredient(
    id:string,
    userId:string
  ){

    return this.ingredientModel.findOneAndDelete({

      _id:id,

      userId:userId

    });

  }









  async updateIngredient(
    id:string,
    data:any,
    userId:string
  ){



    if(data.expiryDate){

      data.expiryDate =
        new Date(data.expiryDate);

    }




    return this.ingredientModel.findOneAndUpdate(

    {
      _id:id,
      userId:userId
    },

    data,

    {
      returnDocument:"after"
    }

  );


  }









  // ของหมดอายุ + ใกล้หมดอายุ ภายใน 3 วัน
  async getExpiringIngredients(
    userId:string
  ){



    const ingredients =
      await this.ingredientModel.find({
        userId:userId
      });



    const today =
      new Date();


    today.setHours(0,0,0,0);






    return ingredients.filter((item)=>{



      if(!item.expiryDate){

        return false;

      }





      const expiry =
        new Date(item.expiryDate);



      expiry.setHours(0,0,0,0);






      const diff =

        Math.ceil(

          (
            expiry.getTime()
            -
            today.getTime()

          )

          /

          (1000*60*60*24)

        );





      // รวมของหมดอายุแล้ว และใกล้หมดอายุ 3 วัน

      return diff <= 3;



    });



  }









  // ของหมดอายุแล้ว (เก็บไว้ใช้ในอนาคต)
  async getExpiredIngredients(
      userId:string
    ){



    const ingredients =
      await this.ingredientModel.find({
        userId:userId
        });





    const today =
      new Date();



    today.setHours(0,0,0,0);






    return ingredients.filter((item)=>{



      if(!item.expiryDate){

        return false;

      }






      const expiry =
        new Date(item.expiryDate);



      expiry.setHours(0,0,0,0);





      return expiry < today;



    });



  }





}