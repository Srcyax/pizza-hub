"use client"
import axios from "axios"
import React from "react";
import { toast } from "sonner"

interface CardInfo {
    user: string;
    address: string;
    pizzaImg: string;
    pizzaName: string;
    pizzaDesc: string;
}


export default function PizzaCardInfo({user, address, pizzaImg, pizzaName, pizzaDesc} : CardInfo){
    return (  
        <div className="border-2 rounded-lg flex flex-col justify-center items-center">
          <img className="m-5" src={"images/" + pizzaImg} width={150} alt="" />
          <h1 className="text-2xl">{pizzaName}</h1>
          <p className="text-center text-zinc-400 m-5">{pizzaDesc}</p>
          <button onClick={() => {
              axios.post("/api/orders", {
                name: "Calabresa"
              })
              .then(res => {
                toast("Olá " + user, {
                  description: "Estamos trabalhando para prepará-lo e estamos prevendo uma entrega no endereço: " + address + " em apenas 40 minutos.",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                  duration: 3000
                })
              })
          }} className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">Pedir</button>
        </div>
    )
}