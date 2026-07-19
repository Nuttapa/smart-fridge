"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function MenuPage(){

  const router = useRouter();
  const [menu,setMenu] = useState<any>(null);


  useEffect(()=>{

    const token = localStorage.getItem("token");


    if(!token){


    }

  },[]);


  const [loading,setLoading] = useState(false);





  async function recommendMenu(){


    try{


      setLoading(true);



      // ดึงวัตถุดิบในตู้เย็น

      const token = localStorage.getItem("token");


      const ingredientRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ingredients`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );



      const ingredientData =
        await ingredientRes.json();




      const ingredients =

        Array.isArray(ingredientData)

        ?

        ingredientData

        :

        ingredientData.data ?? [];





      const names =

        ingredients.map(
          (item:any)=>item.name
        );







      // ส่งไปให้ระบบแนะนำเมนู

      const res =

        await fetch(

          `${process.env.NEXT_PUBLIC_API_URL}/menu/recommend`,

          {

            method:"POST",

            headers:{

              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`

            },


            body:JSON.stringify({

              ingredients:names

            })


          }

        );






      const data =

        await res.json();




      console.log(
        "MENU:",
        data
      );



      setMenu(data);





    }catch(error){


      console.error(error);


      setMenu(null);



    }finally{


      setLoading(false);


    }


  }







return(


<main className="min-h-screen bg-[#F5F5F4] p-10">


<div className="max-w-5xl mx-auto">



<div className="bg-white rounded-2xl shadow p-8">





<h1 className="text-5xl font-bold">

🍳 แนะนำเมนู

</h1>




<p className="text-gray-600 mt-3">

ระบบแนะนำเมนูจากวัตถุดิบที่มีในตู้เย็น

</p>







<button

onClick={recommendMenu}

className="bg-[#1E4620] text-white px-6 py-3 rounded-xl mt-6 font-bold"

>


{

loading

?

"🤖 กำลังคิด..."

:

"🎲 สุ่มเมนู"

}


</button>








{

menu && (


<div className="mt-8 border rounded-2xl p-6">





<h2 className="text-3xl font-bold text-green-600">

{menu.name}

</h2>








<div className="mt-6">


<h3 className="text-xl font-bold">

📦 วัตถุดิบที่ต้องใช้

</h3>




<ul className="list-disc ml-6 mt-3">


{

menu.ingredients?.map(

(item:string,index:number)=>(


<li key={index}>

{item}

</li>


)

)

}



</ul>


</div>









<div className="mt-6">


<h3 className="text-xl font-bold text-green-600">

✅ มีอยู่แล้ว

</h3>



<p className="mt-2">

{

menu.have?.length

?

menu.have.join(", ")

:

"ไม่มี"

}

</p>


</div>









<div className="mt-6">


<h3 className="text-xl font-bold text-red-500">

❌ ขาด

</h3>



<p className="mt-2">

{

menu.missing?.length

?

menu.missing.join(", ")

:

"ครบแล้ว 🎉"

}


</p>


</div>









<div className="mt-6">


<h3 className="text-xl font-bold">

⭐ ความเหมาะสม

</h3>




<div className="w-full bg-gray-200 rounded-full h-5 mt-3">


<div

className="bg-green-500 h-5 rounded-full"

style={{

width:`${menu.score ?? 0}%`

}}


/>


</div>




<p className="mt-2 font-bold">

{menu.score ?? 0}%

</p>



</div>









<div className="mt-6">


<h3 className="text-xl font-bold">

👩‍🍳 วิธีทำ

</h3>



<p className="mt-3 whitespace-pre-line">

{menu.recipe ?? "ไม่มีข้อมูล"}

</p>


</div>







<button

onClick={recommendMenu}

className="bg-[#A7C7D9] text-gray px-5 py-3 rounded-xl mt-8"

>

🎲 สุ่มเมนูใหม่

</button>






</div>


)


}






{

!menu && !loading && (


<p className="mt-8 text-gray-500">

กดปุ่มเพื่อให้ระบบแนะนำเมนู

</p>


)


}





</div>



</div>


</main>


);


}