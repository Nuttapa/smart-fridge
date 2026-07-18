import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type IngredientDocument = Ingredient & Document;


@Schema({
  timestamps:true
})
export class Ingredient {


  @Prop({
    required: true
  })
  userId!: string;


  @Prop()
  name!: string;


  @Prop()
  quantity!: number;


  @Prop()
  unit!: string;


  @Prop()
  expiryDate!: Date;


  @Prop()
  category!: string;


}


export const IngredientSchema =
SchemaFactory.createForClass(Ingredient);