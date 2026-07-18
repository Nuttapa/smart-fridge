import { IsDateString, IsNumber, IsString } from 'class-validator';


export class CreateIngredientDto {

  @IsString()
  name!: string;


  @IsNumber()
  quantity!: number;


  @IsString()
  unit!: string;


  @IsDateString()
  expiryDate!: string;

}