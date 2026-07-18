"use client";

import Link from "next/link";


export default function Navbar(){


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



<Link
href="/fridge"
className="hover:text-green-600"
>
🥬 ตู้เย็น
</Link>



<Link
href="/menu"
className="hover:text-green-600"
>
🍳 เมนู
</Link>


</div>



</div>


</nav>


);


}