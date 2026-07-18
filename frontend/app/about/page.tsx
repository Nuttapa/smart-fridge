export default function AboutPage(){

return(

<main className="min-h-screen bg-[#F5F5F4] p-10">

<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">


<h1 className="text-4xl font-bold">

🧊 Smart Fridge

</h1>


<p className="mt-4 text-gray-600">

ระบบจัดการวัตถุดิบในตู้เย็นอัจฉริยะ

</p>




<h2 className="text-2xl font-bold mt-8">

✨ ความสามารถของระบบ

</h2>


<ul className="list-disc ml-6 mt-4 space-y-2">


<li>
เพิ่ม แก้ไข ลบ วัตถุดิบ
</li>


<li>
จัดเก็บข้อมูลด้วย MongoDB
</li>


<li>
ติดตามวันหมดอายุ
</li>


<li>
แจ้งเตือนวัตถุดิบใกล้หมดอายุ
</li>


<li>
ค้นหาและแบ่งหมวดหมู่
</li>


<li>
แนะนำเมนูจากวัตถุดิบที่มี
</li>


</ul>




<h2 className="text-2xl font-bold mt-8">

📌 วิธีใช้งาน

</h2>


<ol className="list-decimal ml-6 mt-4 space-y-2">


<li>
เพิ่มวัตถุดิบในหน้าตู้เย็น
</li>


<li>
ระบุจำนวน หมวดหมู่ และวันหมดอายุ
</li>


<li>
ตรวจสอบรายการในหน้าหลัก
</li>


<li>
ใช้เมนูแนะนำเพื่อหาเมนูอาหาร
</li>


</ol>



</div>


</main>

)

}