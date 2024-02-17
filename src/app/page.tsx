"use client"
import React from "react";
import { useTheme } from "next-themes"
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("dark")
  })

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="grid grid-cols-2 grid-rows-none place-content-center gap-10 m-10">
        <div className="bg-zinc-900 flex flex-col justify-center items-center">
          <img className="m-5" src="images/place_holder.png" width={150} alt="" />
          <h1>Pizza - Calabresa</h1>
          <button onClick={() => {
            axios.post("/api/orders", {
              name: "Calabresa"
            }).then(res => {
              console.log(res.data);
            })
          }} className="bg-zinc-800 rounded-lg p-3 m-5">Pedir</button>
        </div>
        <div className="bg-zinc-900 w-72 flex flex-col justify-center items-center">
          <img className="m-5" src="images/place_holder.png" width={150} alt="" />
          <h1>Pizza - Mussarela</h1>
          <button className="bg-zinc-800 rounded-lg p-3 m-5">Pedir</button>
        </div>
      </div>
    </main>
  );
}
