"use client";
import PizzaCardInfo from "./PizzaCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pizzas() {
	const router = useRouter();

	const [user, setUser] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [number, setNumber] = useState<string>("");

	useEffect(() => {
		if (
			localStorage.getItem("user") === null ||
			localStorage.getItem("address") === null ||
			localStorage.getItem("number") === null
		) {
			router.push("/Register");
		}

		setUser(localStorage.getItem("user") ?? "");
		setAddress(localStorage.getItem("address") ?? "");
		setNumber(localStorage.getItem("number") ?? "");
	}, []);

	return (
		<main className="flex flex-col items-center justify-between">
			<div className="grid grid-cols-4 max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[668px]:grid-cols-1 grid-rows-none place-content-center gap-10 m-10">
				<PizzaCardInfo
					user={user}
					address={address}
					number={number}
					pizzaImg="calabresa.png"
					pizzaName="Calabresa"
					pizzaDesc="Experimente nossa pizza de calabresa: uma combinação irresistível 
                de queijo derretido, molho de tomate caseiro e calabresa defumada, 
                perfeita para satisfazer seus desejos de pizza clássica e saborosa"
				/>
				<PizzaCardInfo
					user={user}
					address={address}
					number={number}
					pizzaImg="bacon.png"
					pizzaName="Bacon"
					pizzaDesc="Deliciosa e irresistível, nossa pizza de bacon combina 
					o sabor defumado do bacon com queijo derretido sobre 
					uma base de molho de tomate caseiro. Uma explosão de sabores em cada mordida!"
				/>
				<PizzaCardInfo
					user={user}
					address={address}
					number={number}
					pizzaImg="portuguesa.png"
					pizzaName="Portuguesa"
					pizzaDesc="Nossa pizza portuguesa combina presunto, queijo, 
					azeitonas, cebola e pimentão sobre uma base de molho de tomate. 
					Uma explosão de sabores autênticos em cada pedaço!"
				/>
			</div>
		</main>
	);
}
