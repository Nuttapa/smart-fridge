"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username,
            email,
            password,
            }),
        }
        );


      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message || "Register failed");
      }


      alert("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ");

      router.push("/login");


    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }


  return (
    <main className="
      min-h-screen
      bg-[#F5F5F4]
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        shadow-xl
        p-8
      ">


        <div className="text-center mb-8">

          <div className="text-5xl mb-3">
            🥬
          </div>


          <h1 className="
            text-3xl
            font-bold
            text-[#1E4620]
          ">
            Smart Fridge
          </h1>


          <p className="text-gray-500 mt-2">
            สร้างบัญชีเพื่อจัดการตู้เย็น
          </p>

        </div>




        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >


          <div>
            <label className="text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              className="
                w-full
                border
                rounded-xl
                p-3
                mt-1
                focus:outline-none
                focus:ring-2
                focus:ring-green-700
              "
              placeholder="ชื่อผู้ใช้"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>



          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              className="
                w-full
                border
                rounded-xl
                p-3
                mt-1
                focus:outline-none
                focus:ring-2
                focus:ring-green-700
              "
              placeholder="example@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>




          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              className="
                w-full
                border
                rounded-xl
                p-3
                mt-1
                focus:outline-none
                focus:ring-2
                focus:ring-green-700
              "
              placeholder="••••••••"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>




          {
            error && (
              <div className="
                bg-red-100
                text-red-700
                p-3
                rounded-xl
                text-sm
              ">
                {error}
              </div>
            )
          }





          <button
            disabled={loading}
            className="
              w-full
              bg-[#1E4620]
              hover:bg-[#153316]
              text-white
              py-3
              rounded-xl
              font-bold
              transition
            "
          >

            {
              loading
              ? "กำลังสมัคร..."
              : "สมัครสมาชิก"
            }

          </button>


        </form>





        <p className="
          text-center
          text-sm
          text-gray-500
          mt-6
        ">

          มีบัญชีแล้ว?{" "}

          <button
            type="button"
            onClick={()=>router.push("/login")}
            className="
              text-[#1E4620]
              font-bold
            "
          >
            เข้าสู่ระบบ
          </button>

        </p>



      </div>


    </main>
  );
}