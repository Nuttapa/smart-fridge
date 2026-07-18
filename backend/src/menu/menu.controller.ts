import { Body, Controller, Post } from '@nestjs/common';

import { MenuService } from './menu.service';



@Controller("menu")
export class MenuController {



constructor(
private readonly menuService:MenuService
){}





@Post("recommend")

recommend(
@Body() body:any
){


return this.menuService.recommendMenu(
body.ingredients ?? []
);


}



}