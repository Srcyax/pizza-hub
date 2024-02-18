"use client"
import PizzaCardInfo from "./PizzaCard"
import { useEffect, useState } from "react"

export default function Pizzas(){
    const [user, setUser] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        setUser(localStorage.getItem("user") ?? "");
        setAddress(localStorage.getItem("address") ?? "");
    }, [])

    return (
        <main className="flex flex-col items-center justify-between">
            <div className="grid grid-cols-4 max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[668px]:grid-cols-1 grid-rows-none place-content-center gap-10 m-10">
                <PizzaCardInfo user={user}
                address={address}
                pizzaImg="calabresa.png" 
                pizzaName="Calabresa" 
                pizzaDesc="Experimente nossa pizza de calabresa: uma combinação irresistível 
                de queijo derretido, molho de tomate caseiro e calabresa defumada, 
                perfeita para satisfazer seus desejos de pizza clássica e saborosa"
                />
                <PizzaCardInfo user={user}
                address={address}
                pizzaImg="bacon.png" 
                pizzaName="Bacon" 
                pizzaDesc="Experimente nossa pizza de calabresa: uma combinação irresistível 
                de queijo derretido, molho de tomate caseiro e calabresa defumada, 
                perfeita para satisfazer seus desejos de pizza clássica e saborosa"
                />
            </div>
        </main>
    )
}