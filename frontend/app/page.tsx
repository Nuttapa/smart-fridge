"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [expiring, setExpiring] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedToken = localStorage.getItem("token");

  setToken(storedToken);
  setLoading(false);

  if (storedToken) {
    console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);
    loadDashboard(storedToken);
  }

}, []);

  async function loadDashboard(activeToken: string) {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL;
      console.log("CALL API =", api);

      const res = await fetch(`${api}/ingredients`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      const ingredientData = await res.json();

      console.log("STATUS =", res.status);
      console.log("DATA =", ingredientData);

      if (!res.ok) {
        console.log("ERROR =", ingredientData);
        return;
      }

      setIngredients(
        Array.isArray(ingredientData)
          ? ingredientData
          : ingredientData.data ?? []
      );

      const expRes = await fetch(`${api}/ingredients/expiring`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
        cache: "no-store",
      });

      const expData = await expRes.json();

      setExpiring(
        Array.isArray(expData) ? expData : expData.data ?? []
      );
    } catch (error) {
      console.error(error);
      setIngredients([]);
      setExpiring([]);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    
  }

  const categories = [
    "ผัก",
    "ผลไม้",
    "เนื้อสัตว์",
    "อาหารทะเล",
    "เครื่องปรุง",
    "เครื่องดื่ม",
    "อื่นๆ",
  ];

  // 1. ระหว่างรอโหลดค่าจาก localStorage ป้องกันหน้าจอวับข้ามหน้า
  if (loading) {
    return <main className="min-h-screen bg-[#F5F5F4]" />;
  }

  // 2. เงื่อนไขครอบหน้า Dashboard หากไม่มีการล็อกอิน (ไม่มี Token)
  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5F5F4]">
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <h1 className="text-3xl font-bold mb-5">🧊 Smart Fridge</h1>
          <p className="mb-6">ระบบจัดการวัตถุดิบในตู้เย็นอัจฉริยะ</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-[#1E4620] text-white px-6 py-3 rounded-xl"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/register"
              className="bg-gray-200 px-6 py-3 rounded-xl"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 3. หน้า Dashboard หลัก (แสดงเมื่อล็อกอินสำเร็จแล้ว)
  return (
    <main className="min-h-screen bg-[#F5F5F4] p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">🧊 Smart Fridge Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
          >
            ออกจากระบบ
          </button>
        </div>

        <p className="text-gray-600 mt-2">ระบบจัดการวัตถุดิบในตู้เย็นอัจฉริยะ</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-500">🥬 วัตถุดิบทั้งหมด</p>
            <h2 className="text-4xl font-bold mt-3">{ingredients.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-500">⚠️ ใกล้หมดอายุ</p>
            <h2 className="text-4xl font-bold text-red-500 mt-3">{expiring.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
            <p className="text-gray-500">🍳 แนะนำเมนู</p>
            <Link
              href="/menu"
              className="inline-block mt-4 bg-[#1E4620] hover:bg-[#1E4620] text-white px-5 py-2 rounded-xl"
            >
              ดูเมนู
            </Link>
          </div>
        </div>

        <div className="bg-[#1E4620] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 border border-white mt-8">
          <h2 className="text-2xl font-bold text-white">📂 จำนวนตามหมวดหมู่</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-5">
            {categories.map((cat) => (
              <div
                key={cat}
                className="bg-[#ffffff] rounded-xl p-4 border border-white/20 hover:-translate-y-1 transition-all"
              >
                <p>{cat}</p>
                <h3 className="text-3xl font-bold">
                  {ingredients.filter((item) => item.category === cat).length}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E4620] rounded-2xl shadow p-6 mt-8">
          <h2 className="text-2xl font-bold text-white">⚠️ วัตถุดิบใกล้หมดอายุ</h2>
          {expiring.length === 0 ? (
            <p className="mt-4 text-white">ไม่มีวัตถุดิบใกล้หมดอายุ</p>
          ) : (
            <div className="mt-4 space-y-3">
              {expiring.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#ffffff] rounded-xl p-4 flex justify-between border border-white/20"
                >
                  <div>
                    <p className="text-lg font-bold">{item.name}</p>
                    <p className="text-gray-600">
                      หมดอายุ: {item.expiryDate?.slice(0, 10)}
                    </p>
                  </div>
                  <p className="text-red-500 font-bold">⚠️ ควรใช้เร็ว</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}