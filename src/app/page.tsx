"use client"
import React from "react";
import { Instagram, Facebook, Twitter  } from 'lucide-react'
import { useTheme } from "next-themes"
import { useEffect } from "react";

export default function Home() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("dark")
  })

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center m-5">
        <div className="flex flex-col items-center justify-center mb-60">
          <h1 className="text-4xl text-center mx-5">A melhor <strong className="text-orange-500">Pizzaria</strong> da região</h1>
          <p className="text-center text-zinc-400">Na nossa pizzaria, saboreie a excelência em cada fatia. <br/> Experimente hoje e descubra por que somos os favoritos da cidade!</p>
          <div className="grid grid-cols-3 gap-3 m-5">
            <a href="" target="_blank"><Instagram className="hover:text-orange-500 transition-colors"/></a>
            <a href="" target="_blanck"><Facebook className="hover:text-orange-500 transition-colors"/></a>
            <a href="" target="_black"><Twitter className="hover:text-orange-500 transition-colors"/></a>
          </div>
        </div>
          <img className="" src="images/pizza.png" alt="pizza_image" width={700} />
      </div>
    </main>
  );
}
