"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);


  function logout() {

    localStorage.removeItem("token");

    setToken(null);

    router.push("/login");

  }



  return (

    <nav className="bg-white shadow p-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">


        <Link 
          href="/"
          className="text-2xl font-bold"
        >
          🧊 Smart Fridge
        </Link>



        <div className="flex gap-5 items-center">


          <Link
            href="/"
            className="hover:text-green-600"
          >
            🏠 หน้าหลัก
          </Link>



          {token && (
            <>


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



              <button

                onClick={logout}

                className="
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  hover:bg-red-600
                "

              >
                ออกจากระบบ
              </button>


            </>
          )}



          {!token && (
            <>

              <Link
                href="/login"
                className="
                  text-[#1E4620]
                  font-bold
                "
              >
                เข้าสู่ระบบ
              </Link>


              <Link
                href="/register"
                className="
                  bg-[#1E4620]
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                สมัครสมาชิก
              </Link>

            </>
          )}



        </div>


      </div>


    </nav>

  );

}