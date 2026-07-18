import type { Metadata } from "next";
import "./globals.css";

import Link from "next/link";


export const metadata: Metadata = {
  title: "Smart Fridge",
  description: "ระบบจัดการตู้เย็นอัจฉริยะ",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="th">

      <body>


        <nav className="bg-green-600 text-white px-8 py-4 shadow">


          <div className="max-w-6xl mx-auto flex justify-between items-center">


            <Link
              href="/"
              className="text-2xl font-bold"
            >
              🧊 Smart Fridge
            </Link>



            <div className="flex gap-5">


              <Link
                href="/"
                className="hover:underline"
              >
                🏠 หน้าหลัก
              </Link>



              <Link
                href="/fridge"
                className="hover:underline"
              >
                🥬 ตู้เย็น
              </Link>



              <Link
                href="/menu"
                className="hover:underline"
              >
                🍳 แนะนำเมนู
              </Link>

              <Link
                href="/about"
                className="hover:underline"
                >
                📖 วิธีใช้
                </Link>


            </div>


          </div>


        </nav>



        {children}


      </body>


    </html>

  );

}