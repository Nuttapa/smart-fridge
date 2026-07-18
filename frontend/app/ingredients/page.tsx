"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function IngredientsPage(){

const router = useRouter();

const [ingredients,setIngredients]
=useState<any[]>([]);


const [search,setSearch]
=useState("");



const [name,setName]
=useState("");

const [quantity,setQuantity]
=useState("");

const [unit,setUnit]
=useState("");

const [category,setCategory]
=useState("");

const [expiryDate,setExpiryDate]
=useState("");



const [editId,setEditId]
=useState<string|null>(null);





useEffect(()=>{

  const token = localStorage.getItem("token");

  if(!token){
    router.push("/login");
    return;
  }

  loadIngredients();

},[router]);

async function loadIngredients(){

  try{

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ingredients`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const data = await res.json();


    setIngredients(

      Array.isArray(data)

      ?

      data

      :

      data.data ?? []

    );


  }catch(error){

    console.error(error);

    setIngredients([]);

  }

}


async function saveIngredient(){


const body={

name,

quantity:Number(quantity),

unit,

category,

expiryDate

};





if(editId){


await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${editId}`,

{

method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify(body)

}

);



}else{


await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/ingredients`,

{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},

body:JSON.stringify(body)

}

);


}



clearForm();

await loadIngredients();


}








function editIngredient(item:any){


setEditId(item._id);


setName(item.name);

setQuantity(item.quantity);


setUnit(item.unit ?? "");


setCategory(item.category ?? "");




if(item.expiryDate){


const date =
new Date(item.expiryDate);


setExpiryDate(

date.toISOString().slice(0,10)

);


}else{


setExpiryDate("");

}


}







async function deleteIngredient(id:string){


await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`,

{

method:"DELETE",

headers:{
  Authorization:`Bearer ${localStorage.getItem("token")}`
}

}

);


await loadIngredients();


}



function clearForm(){


setEditId(null);

setName("");

setQuantity("");

setUnit("");

setCategory("");

setExpiryDate("");


}







const filtered =

ingredients.filter(item=>

item.name

.toLowerCase()

.includes(

search.toLowerCase()

)

);







return(


<main className="min-h-screen bg-gray-100 p-10">


<div className="max-w-5xl mx-auto">





<h1 className="text-4xl font-bold mb-8">

🥬 จัดการวัตถุดิบ

</h1>






<div className="bg-white p-6 rounded-xl shadow">


<h2 className="text-2xl font-bold">


{editId ? "✏️ แก้ไขวัตถุดิบ" : "➕ เพิ่มวัตถุดิบ"}

</h2>





<div className="grid md:grid-cols-5 gap-3 mt-5">



<input

className="border p-2 rounded"

placeholder="ชื่อ"

value={name}

onChange={
e=>setName(e.target.value)
}

/>




<input

className="border p-2 rounded"

placeholder="จำนวน"

value={quantity}

onChange={
e=>setQuantity(e.target.value)
}

/>




<select

className="border p-2 rounded"

value={unit}

onChange={
e=>setUnit(e.target.value)
}

>


<option value="">
หน่วย
</option>

<option value="ฟอง">
🥚 ฟอง
</option>

<option value="ลูก">
🍎 ลูก
</option>

<option value="กิโลกรัม">
⚖️ กิโลกรัม
</option>

<option value="กล่อง">
📦 กล่อง
</option>

<option value="ขวด">
🍶 ขวด
</option>


</select>







<select

className="border p-2 rounded"

value={category}

onChange={
e=>setCategory(e.target.value)
}

>


<option value="">
หมวด
</option>


<option value="ผัก">
🥬 ผัก
</option>


<option value="ผลไม้">
🍎 ผลไม้
</option>


<option value="โปรตีน">
🥚 โปรตีน
</option>


<option value="เนื้อ">
🥩 เนื้อ
</option>


<option value="เครื่องดื่ม">
🥤 เครื่องดื่ม
</option>



</select>






<input

className="border p-2 rounded"

type="date"

value={expiryDate}

onChange={
e=>setExpiryDate(e.target.value)
}

/>



</div>






<button

className="bg-blue-500 text-white px-5 py-2 rounded mt-5"

onClick={saveIngredient}

>


{editId ? "บันทึก" : "เพิ่ม"}


</button>



</div>









<div className="bg-white p-6 rounded-xl shadow mt-8">



<h2 className="text-2xl font-bold">

🥬 รายการทั้งหมด

</h2>





<input

className="border p-2 rounded mt-4 w-full"

placeholder="🔍 ค้นหา"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>







{
filtered.map(item=>(



<div

key={item._id}

className="border p-4 rounded mt-4 flex justify-between"

>



<div>


<p className="text-xl font-bold">

{item.name}

</p>


<p>

จำนวน {item.quantity} {item.unit}

</p>


<p>

หมวด {item.category ?? "-"}

</p>


<p>

หมดอายุ {item.expiryDate?.slice(0,10) ?? "-"}

</p>



</div>






<div>


<button

className="bg-yellow-400 px-3 py-1 rounded mr-2"

onClick={()=>editIngredient(item)}

>

แก้ไข

</button>




<button

className="bg-red-500 text-white px-3 py-1 rounded"

onClick={()=>deleteIngredient(item._id)}

>

ลบ

</button>



</div>



</div>



))

}





</div>





</div>


</main>


)


}