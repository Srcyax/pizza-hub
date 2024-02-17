"use client"
import React from "react";
import { toast } from "sonner"
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
        <div className="border-2 rounded-lg flex flex-col justify-center items-center">
          <img className="m-5" src="images/place_holder.png" width={150} alt="" />
          <h1>Pizza - Calabresa</h1>
          <button onClick={() => {
              axios.post("/api/orders", {
                name: "Calabresa"
              }).then(res => {
                toast("Olá [Nome do Cliente]", {
                  description: "Seu pedido foi confirmado! Estamos trabalhando para prepará-lo e estamos prevendo uma entrega em apenas 40 minutos.",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                  duration: 3000
                })
              })
          }} className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">Pedir</button>
        </div>
      </div>
    </main>
  );
}
