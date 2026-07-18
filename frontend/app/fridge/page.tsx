"use client";

import { useEffect, useState } from "react";


export default function FridgePage(){


const [ingredients,setIngredients] = useState<any[]>([]);

const [expiring,setExpiring] = useState<any[]>([]);

const [search,setSearch] = useState("");

const [filterCategory,setFilterCategory] = useState("ทั้งหมด");

const [name,setName] = useState("");

const [quantity,setQuantity] = useState("");

const [unit,setUnit] = useState("");

const [category,setCategory] = useState("");

const [expiryDate,setExpiryDate] = useState("");

const [editId,setEditId] = useState<string|null>(null);





useEffect(()=>{

loadData();

},[]);






async function loadData(){

  try{

    const res = await fetch(
      "http://localhost:3001/ingredients"
    );

    const data = await res.json();

    console.log("INGREDIENTS:", data);


    setIngredients(

      Array.isArray(data)

      ?

      data

      :

      data.data ?? []

    );





    const expRes = await fetch(
      "https://smart-fridge-99dz.onrender.com/ingredients/expiring"
    );


    const expData = await expRes.json();


    setExpiring(

      Array.isArray(expData)

      ?

      expData

      :

      expData.data ?? []

    );



  }catch(error){

    console.error(error);

    setIngredients([]);

    setExpiring([]);

  }

}









async function saveIngredient(){



const body = {

name,

quantity:Number(quantity),

unit,

category,

expiryDate

};





if(editId){


await fetch(

`https://smart-fridge-99dz.onrender.com/ingredients,

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(body)

}

);



}else{



await fetch(

"http://localhost:3001/ingredients",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(body)

}

);



}



clearForm();

loadData();


}









function editIngredient(item:any){



setEditId(item._id);

setName(item.name);

setQuantity(
String(item.quantity)
);

setUnit(
item.unit ?? ""
);

setCategory(
item.category ?? ""
);



setExpiryDate(

item.expiryDate

?

new Date(item.expiryDate)
.toISOString()
.slice(0,10)

:

""

);


}









async function deleteIngredient(id:string){



await fetch(

`http://localhost:3001/ingredients/${id}`,

{

method:"DELETE"

}

);



loadData();


}









function clearForm(){


setEditId(null);

setName("");

setQuantity("");

setUnit("");

setCategory("");

setExpiryDate("");


}









function getExpireStatus(date:string){


if(!date){

return {

text:"ไม่มีวันหมดอายุ",

color:"bg-gray-100"

};

}



const today =
new Date();


today.setHours(0,0,0,0);



const expiry =
new Date(date);


expiry.setHours(0,0,0,0);



const diff =

Math.ceil(

(expiry.getTime()
-
today.getTime())

/

(1000*60*60*24)

);





if(diff < 0){

return{

text:"หมดอายุแล้ว ❌",

color:"bg-gray-200"

};

}




if(diff === 0){

return{

text:"หมดอายุวันนี้ 🔴",

color:"bg-red-100"

};

}





if(diff <=3){

return{

text:`🔴 เหลือ ${diff} วัน`,

color:"bg-red-100"

};

}





if(diff <=7){

return{

text:`🟡 เหลือ ${diff} วัน`,

color:"bg-yellow-100"

};

}





return{

text:`🟢 เหลือ ${diff} วัน`,

color:"bg-green-100"

};


}










const filteredIngredients =

ingredients.filter((item)=>{


const itemName =

(item.name ?? "")
.toLowerCase();



const searchText =

search.toLowerCase();



const matchSearch =

itemName.includes(searchText);




const matchCategory =

filterCategory === "ทั้งหมด"

?

true

:

item.category === filterCategory;



return matchSearch && matchCategory;


});









return(


<main className="min-h-screen bg-gray-100 p-10">


<div className="max-w-6xl mx-auto">





<h1 className="text-4xl font-bold mb-8">

🥬 จัดการตู้เย็น

</h1>









<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-2xl font-bold">

{

editId

?

"✏️ แก้ไขวัตถุดิบ"

:

"➕ เพิ่มวัตถุดิบ"

}

</h2>





<div className="grid md:grid-cols-5 gap-3 mt-5">



<input

className="border p-2 rounded"

placeholder="ชื่อ"

value={name}

onChange={e=>setName(e.target.value)}

/>




<input

className="border p-2 rounded"

placeholder="จำนวน"

value={quantity}

onChange={e=>setQuantity(e.target.value)}

/>







<select

className="border p-2 rounded"

value={unit}

onChange={e=>setUnit(e.target.value)}

>

<option value="">หน่วย</option>

<option>ฟอง</option>

<option>ลูก</option>

<option>กิโลกรัม</option>

<option>ขวด</option>

<option>กล่อง</option>

<option>ถุง</option>


</select>









<select

className="border p-2 rounded"

value={category}

onChange={
e=>setCategory(e.target.value)
}

>


<option value="">
หมวดหมู่
</option>


<option value="ผัก">
🥬 ผัก
</option>


<option value="ผลไม้">
🍎 ผลไม้
</option>


<option value="เนื้อสัตว์">
🥩 เนื้อสัตว์
</option>


<option value="อาหารทะเล">
🦐 อาหารทะเล
</option>


<option value="เครื่องปรุง">
🧂 เครื่องปรุง
</option>


<option value="เครื่องดื่ม">
🥤 เครื่องดื่ม
</option>


<option value="อื่นๆ">
📦 อื่นๆ
</option>


</select>







<input

className="border p-2 rounded"

type="date"

value={expiryDate}

onChange={e=>setExpiryDate(e.target.value)}

/>



</div>






<button

onClick={saveIngredient}

className="bg-blue-500 text-white px-5 py-2 rounded mt-5"

>

{

editId

?

"บันทึก"

:

"เพิ่ม"

}


</button>




</div>









<div className="bg-white p-6 rounded-2xl shadow mt-8">


<h2 className="text-2xl font-bold">

📦 รายการวัตถุดิบ

</h2>





<input

className="border p-3 rounded w-full mt-4"

placeholder="🔍 ค้นหา"

value={search}

onChange={e=>setSearch(e.target.value)}

/>

<select

className="border p-3 rounded mt-3"

value={filterCategory}

onChange={
e=>setFilterCategory(e.target.value)
}

>


<option value="ทั้งหมด">
📦 ทั้งหมด
</option>


<option value="ผัก">
🥬 ผัก
</option>


<option value="ผลไม้">
🍎 ผลไม้
</option>


<option value="เนื้อสัตว์">
🥩 เนื้อสัตว์
</option>


<option value="อาหารทะเล">
🦐 อาหารทะเล
</option>


<option value="เครื่องปรุง">
🧂 เครื่องปรุง
</option>


<option value="เครื่องดื่ม">
🥤 เครื่องดื่ม
</option>


<option value="อื่นๆ">
📦 อื่นๆ
</option>


</select>







<div className="grid md:grid-cols-2 gap-5 mt-5">


{

filteredIngredients.map(item=>{


const status =
getExpireStatus(item.expiryDate);



return(


<div

key={item._id}

className={`rounded-2xl p-5 shadow ${status.color}`}

>


<h3 className="text-2xl font-bold">

{item.name}

</h3>



<p>

จำนวน: {item.quantity} {item.unit}

</p>



<p>

หมวดหมู่: {item.category ?? "-"}

</p>



<p>

หมดอายุ: {item.expiryDate?.slice(0,10) ?? "-"}

</p>



<p className="font-bold mt-2">

{status.text}

</p>





<div className="mt-4">


<button

className="bg-yellow-400 px-3 py-2 rounded mr-2"

onClick={()=>editIngredient(item)}

>

แก้ไข

</button>





<button

className="bg-red-500 text-white px-3 py-2 rounded"

onClick={()=>deleteIngredient(item._id)}

>

ลบ

</button>


</div>





</div>


)


})


}



</div>



</div>







</div>


</main>


);


}