"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar(){

const router = useRouter();


function goProtectedPage(path:string){

  const token = localStorage.getItem("token");

  if(!token){
    router.push("/login");
    return;
  }

  router.push(path);

}


return(

<nav className="bg-white shadow p-4">


<div className="max-w-6xl mx-auto flex justify-between items-center">


<h1 className="text-2xl font-bold">
🧊 Smart Fridge
</h1>



<div className="flex gap-5">


<Link
href="/"
className="hover:text-green-600"
>
🏠 หน้าหลัก
</Link>



<button
onClick={()=>goProtectedPage("/fridge")}
className="hover:text-green-600"
>
🥬 ตู้เย็น
</button>



<button
onClick={()=>goProtectedPage("/menu")}
className="hover:text-green-600"
>
🍳 เมนู
</button>


</div>



</div>


</nav>


);

}