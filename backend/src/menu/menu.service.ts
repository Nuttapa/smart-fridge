import { Injectable } from '@nestjs/common';


@Injectable()
export class MenuService {


  recommendMenu(ingredients:string[]){


    const menus = [


      {
        name:"🍳 ไข่เจียว",
        ingredients:[
          "ไข่",
          "น้ำมัน",
          "เครื่องปรุง"
        ],
        recipe:
        "1. ตอกไข่ใส่ชาม\n2. ใส่เครื่องปรุง\n3. ทอดในน้ำมันร้อน"
      },



      {
        name:"🍚 ข้าวผัดไข่",
        ingredients:[
          "ไข่",
          "ข้าว",
          "เครื่องปรุง"
        ],
        recipe:
        "1. ผัดข้าวกับไข่\n2. ใส่เครื่องปรุง\n3. ผัดให้เข้ากัน"
      },



      {
        name:"🥗 สลัดผลไม้",
        ingredients:[
          "แอปเปิ้ล",
          "กล้วย"
        ],
        recipe:
        "1. หั่นผลไม้\n2. ผสมรวมกัน"
      },



      {
        name:"🥬 ผัดผักรวม",
        ingredients:[
          "ผัก",
          "น้ำมัน",
          "เครื่องปรุง"
        ],
        recipe:
        "1. หั่นผัก\n2. ผัดด้วยน้ำมัน\n3. ปรุงรส"
      },



      {
        name:"🍌 กล้วยทอด",
        ingredients:[
          "กล้วย",
          "แป้ง",
          "น้ำมัน"
        ],
        recipe:
        "1. ชุบกล้วยกับแป้ง\n2. ทอดจนเหลือง"
      }



    ];





    const result = menus.map(menu=>{


      const have =
        menu.ingredients.filter(item=>{


          return ingredients.some(
            userItem =>
            userItem.includes(item)
          );


        });




      const missing =
        menu.ingredients.filter(item=>{


          return !ingredients.some(
            userItem =>
            userItem.includes(item)
          );


        });





      const score =
      Math.round(
        (have.length /
        menu.ingredients.length)
        *100
      );





      return {

        name:menu.name,

        ingredients:menu.ingredients,

        recipe:menu.recipe,

        have,

        missing,

        score

      };


    });





    const sorted =
      result.sort(
        (a,b)=>
        b.score-a.score
      );





    const randomIndex =
      Math.floor(
        Math.random()*Math.min(sorted.length,3)
      );



    return sorted[randomIndex];



  }


}