"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OrderCard from "./orderCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Order {
	user: string;
	address: string;
	number: string;
	name: string;
	pizzaInfo: PizzaInformation;
	pizzaImg: string;
}

interface PizzaInformation {
	additionals: string;
	observation: string;
	delivery_method: string;
	payment_method: string;
}

export default function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [ordersIsLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		axios.get("/api/orders").then((res) => {
			setOrders(res.data.orders);
			setIsLoaded(true);
		});
	}, []);

	const handleOrderComplete = async (index: number, order: Order) => {
		try {
			await axios.post("/api/remove-order", { name: order.name }).then(() => {
				/*axios
					.post("/api/wpp-msg", {
						message:
							"Olá, " +
							order.user +
							". Seu pedido ja saiu para rota de entrega, bom apetite 😋🍕!",
						number: order.number,
					})
					.then(() => {
						toast("Sucesso!", {
							description: "O pedido foi concluído, o Cliente já foi notificado",
							action: {
								label: "Ok",
								onClick: () => console.log("Undo"),
							},
						});
					});*/
				toast("Sucesso!", {
					description: "O pedido foi concluído, o Cliente já foi notificado",
					action: {
						label: "Ok",
						onClick: () => console.log("Undo"),
					},
				});
			});
			setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
		} catch (error) {
			console.error("Error removing order:", error);
			toast("Erro!", {
				description: "Erro ao remover o pedido",
				action: {
					label: "Ok",
					onClick: () => console.log("Undo"),
				},
			});
		}
	};

	return (
		<main className="flex flex-col items-center justify-between">
			<h1>Pedidos:</h1>
			{ordersIsLoaded ? (
				<div className="grid grid-cols-4 max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[668px]:grid-cols-1 grid-rows-none place-content-center gap-10 m-10">
					{orders.map((order, index) => (
						<div key={index}>
							<OrderCard
								user={order.user}
								address={order.address}
								number={order.number}
								name={order.name}
								pizzaInfo={order.pizzaInfo}
								pizzaImg={order.pizzaImg}
								orders={orders}
								index={index}
								onOrderComplete={handleOrderComplete}
							/>
						</div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-4 max-[1300px]:grid-cols-3 max-[1024px]:grid-cols-2 max-[668px]:grid-cols-1 grid-rows-none place-content-center gap-10 m-10">
					<Skeleton className="h-[350px] w-[230px] rounded-lg" />
					<Skeleton className="h-[350px] w-[230px] rounded-lg" />
					<Skeleton className="h-[350px] w-[230px] rounded-lg" />
					<Skeleton className="h-[350px] w-[230px] rounded-lg" />
				</div>
			)}
		</main>
	);
}
