"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FridgePage() {
  const router = useRouter();

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [expiring, setExpiring] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ทั้งหมด");

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadData();
  }, []);

  async function loadData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // 1. Fetch วัตถุดิบทั้งหมด (แก้ไข URL เป็น String Template ที่ถูกต้อง)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await res.json();
      
      // ====== DEBUG สำหรับวัตถุดิบทั้งหมด ======
      console.log("=== ALL INGREDIENTS DEBUG ===");
      console.log("STATUS:", res.status);
      console.log("TOKEN:", token);
      console.log("DATA:", data);
      // =====================================

      const ingredientList = Array.isArray(data)
        ? data
        : data.data ?? [];

      console.log("SET INGREDIENTS =", ingredientList);

      setIngredients(ingredientList);

      // 2. Fetch วัตถุดิบที่กำลังจะหมดอายุ (แก้ไข URL เป็น String Template ที่ถูกต้อง)
      const expRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/expiring`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const expData = await expRes.json();

      // ====== DEBUG สำหรับวัตถุดิบที่กำลังจะหมดอายุ ======
      console.log("=== EXPIRING INGREDIENTS DEBUG ===");
      console.log("STATUS:", expRes.status);
      console.log("TOKEN:", token);
      console.log("DATA:", expData);
      // =============================================

      setExpiring(Array.isArray(expData) ? expData : expData.data ?? []);
    } catch (error) {
      console.error("LOAD DATA ERROR:", error);
      setIngredients([]);
      setExpiring([]);
    }
  }

  async function saveIngredient() {
    const body = {
      name,
      quantity: Number(quantity),
      unit,
      category,
      expiryDate,
    };

    const token = localStorage.getItem("token");

    try {
      if (editId) {
        // 3. PUT (แก้ไข URL เอา https:// และ /auth/login ออก)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      } else {
        // 4. POST (แก้ไข URL ให้เรียบร้อย)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      }

      clearForm();
      loadData();
    } catch (error) {
      console.error(error);
    }
  }

  function editIngredient(item: any) {
    setEditId(item._id);
    setName(item.name);
    setQuantity(String(item.quantity));
    setUnit(item.unit ?? "");
    setCategory(item.category ?? "");
    setExpiryDate(item.expiryDate ? new Date(item.expiryDate).toISOString().slice(0, 10) : "");
  }

  async function deleteIngredient(id: string) {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบวัตถุดิบนี้?")) return;
    
    const token = localStorage.getItem("token");
    // 5. DELETE (ลบ string ขยะที่ซ้อนอยู่ออกทั้งหมดให้เหลือแค่ชุดตัวแปร env)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadData();
  }

  function clearForm() {
    setEditId(null);
    setName("");
    setQuantity("");
    setUnit("");
    setCategory("");
    setExpiryDate("");
  }

  function getExpireStatus(date: string) {
    if (!date) {
      return {
        text: "ไม่มีวันหมดอายุ",
        color: "bg-gray-100",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(date);
    expiry.setHours(0, 0, 0, 0);

    const diff = Math.ceil(
      (expiry.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {
      return {
        text: "หมดอายุแล้ว ❌",
        color: "bg-gray-200 text-gray-800",
      };
    }

    if (diff === 0) {
      return {
        text: "หมดอายุวันนี้ 🔴",
        color: "bg-red-100 text-red-900",
      };
    }

    if (diff <= 3) {
      return {
        text: `🔴 เหลือ ${diff} วัน`,
        color: "bg-red-50 text-red-900",
      };
    }

    if (diff <= 7) {
      return {
        text: `🟡 เหลือ ${diff} วัน`,
        color: "bg-yellow-50 text-yellow-900",
      };
    }

    return {
      text: `🟢 เหลือ ${diff} วัน`,
      color: "bg-green-50 text-green-900",
    };
  }

  const filteredIngredients = ingredients.filter((item) => {
    const itemName = (item.name ?? "").toLowerCase();
    const searchText = search.toLowerCase();
    const matchSearch = itemName.includes(searchText);
    const matchCategory =
      filterCategory === "ทั้งหมด"
        ? true
        : item.category === filterCategory;

    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-[#F5F5F4] p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🥬 จัดการตู้เย็น</h1>

        {/* ฟอร์ม เพิ่ม/แก้ไข วัตถุดิบ */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold">{editId ? "✏️ แก้ไขวัตถุดิบ" : "➕ เพิ่มวัตถุดิบ"}</h2>

          <div className="grid md:grid-cols-5 gap-3 mt-5">
            <input
              className="border p-2 rounded"
              placeholder="ชื่อ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="จำนวน"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <select className="border p-2 rounded" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">หน่วย</option>
              <option>ฟอง</option>
              <option>ลูก</option>
              <option>กิโลกรัม</option>
              <option>ขวด</option>
              <option>กล่อง</option>
              <option>ถุง</option>
            </select>

            <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">หมวดหมู่</option>
              <option value="ผัก">🥬 ผัก</option>
              <option value="ผลไม้">🍎 ผลไม้</option>
              <option value="เนื้อสัตว์">🥩 เนื้อสัตว์</option>
              <option value="อาหารทะเล">🦐 อาหารทะเล</option>
              <option value="เครื่องปรุง">🧂 เครื่องปรุง</option>
              <option value="เครื่องดื่ม">🥤 เครื่องดื่ม</option>
              <option value="อื่นๆ">📦 อื่นๆ</option>
            </select>

            <input
              className="border p-2 rounded"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-5">
            <button onClick={saveIngredient} className="bg-[#1E4620] hover:bg-[#153316] text-white px-5 py-2 rounded transition-colors">
              {editId ? "บันทึก" : "เพิ่ม"}
            </button>
            {editId && (
              <button onClick={clearForm} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded transition-colors">
                ยกเลิก
              </button>
            )}
          </div>
        </div>

        {/* รายการวัตถุดิบทั้งหมด */}
        <div className="bg-white p-6 rounded-2xl shadow mt-8">
          <h2 className="text-2xl font-bold">📦 รายการวัตถุดิบ</h2>

          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <input
              className="border p-3 rounded flex-1"
              placeholder="🔍 ค้นหาวัตถุดิบ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border p-3 rounded md:w-48"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="ทั้งหมด">📦 ทั้งหมด</option>
              <option value="ผัก">🥬 ผัก</option>
              <option value="ผลไม้">🍎 ผลไม้</option>
              <option value="เนื้อสัตว์">🥩 เนื้อสัตว์</option>
              <option value="อาหารทะเล">🦐 อาหารทะเล</option>
              <option value="เครื่องปรุง">🧂 เครื่องปรุง</option>
              <option value="เครื่องดื่ม">🥤 เครื่องดื่ม</option>
              <option value="อื่นๆ">📦 อื่นๆ</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            {filteredIngredients.length === 0 ? (
              <p className="text-gray-500 col-span-2 text-center py-8">ไม่พบข้อมูลวัตถุดิบ</p>
            ) : (
              filteredIngredients.map((item) => {
                const status = getExpireStatus(item.expiryDate);

                return (
                  <div key={item._id} className={`rounded-2xl p-5 shadow border transition-all ${status.color}`}>
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p>จำนวน: {item.quantity} {item.unit}</p>
                    <p>หมวดหมู่: {item.category ?? "-"}</p>
                    <p>หมดอายุ: {item.expiryDate ? item.expiryDate.slice(0, 10) : "-"}</p>
                    <p className="font-bold mt-2">{status.text}</p>

                    <div className="mt-4 flex gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-950 px-3 py-2 rounded font-medium transition-colors" onClick={() => editIngredient(item)}>
                        แก้ไข
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-medium transition-colors" onClick={() => deleteIngredient(item._id)}>
                        ลบ
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}