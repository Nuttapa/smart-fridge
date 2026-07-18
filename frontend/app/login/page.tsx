"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage(){

  const router = useRouter();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  async function login(){

    const res = await fetch(
      "https://smart-fridge-99dz.onrender.com/auth/login",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email,
          password
        })

      }
    );


    const data = await res.json();


    if(data.access_token){

      localStorage.setItem(
        "token",
        data.access_token
      );


      router.push("/");

    }


  }


  return (

    <main className="p-10">

      <h1 className="text-3xl font-bold">
        Login
      </h1>


      <input
        className="border p-2 block mt-5"
        placeholder="Email"
        onChange={
          e=>setEmail(e.target.value)
        }
      />


      <input
        className="border p-2 block mt-3"
        placeholder="Password"
        type="password"
        onChange={
          e=>setPassword(e.target.value)
        }
      />


      <button
        className="bg-green-700 text-white p-2 mt-5"
        onClick={login}
      >
        Login
      </button>


    </main>

  );

}