import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface PizzaInformation {
	additionals: string;
	observation: string;
	delivery_method: string;
	payment_method: string;
}

interface Order {
	user: string;
	address: string;
	number: string;
	name: string;
	pizzaInfo: PizzaInformation;
	pizzaImg: string;
}

interface OrderCardProps {
	user: string;
	number: string;
	address: string;
	name: string;
	pizzaInfo: PizzaInformation;
	pizzaImg: string;
	orders: Order[];
	index: number;
	onOrderComplete: (index: number, order: Order) => void;
}

export default function OrderCard({
	user,
	address,
	number,
	name,
	pizzaInfo,
	pizzaImg,
	orders,
	index,
	onOrderComplete,
}: OrderCardProps) {
	const [isImageLoaded, setImageLoaded] = useState(false);

	const handleSetImageLoaded = () => {
		setImageLoaded(true);
	};

	const handleCompleteOrder = () => {
		const order = orders[index];
		onOrderComplete(index, order);
	};

	return (
		<div className="border-2 rounded-lg flex flex-col items-center w-60">
			{!isImageLoaded ? (
				<Skeleton className="rounded-xl w-[200px] h-[150px] m-5" />
			) : null}
			<LazyLoadImage
				className={isImageLoaded ? "m-5 rounded-xl h-36" : ""}
				beforeLoad={handleSetImageLoaded}
				src={"images/" + pizzaImg}
				width={200}
				alt=""
			/>
			<h1>{name}</h1>
			<div className="flex flex-col m-5 w-52">
				<p className="text-center text-zinc-400">{"Cliente: " + user}</p>
				<p className="text-center text-zinc-400">{"Endereço: " + address}</p>
			</div>
			<div className="flex gap-2 justify-center items-center m-5 w-60 h-36 p-5 text-center break-words">
				<div className="flex flex-col items-center">
					<p className="text-[13px]">
						{pizzaInfo.additionals !== "" ? (
							<div>
								<strong>Adicionais:</strong> {pizzaInfo.additionals}
							</div>
						) : null}
						<Separator className="my-2" />
					</p>
					<p className="text-[13px]">
						{pizzaInfo.delivery_method !== "" ? (
							<div>
								<strong>Método de entrega:</strong> {pizzaInfo.delivery_method}
							</div>
						) : null}
						<Separator className="my-2" />
					</p>
					<p className="text-[13px]">
						{pizzaInfo.payment_method !== "" ? (
							<div>
								<strong>Método de pagamento:</strong> {pizzaInfo.payment_method}
							</div>
						) : null}
						<Separator className="my-2" />
					</p>

					<p className="text-[13px]">
						{pizzaInfo.observation !== "" ? (
							<div>
								<strong className="text-center">Observações: </strong>
								{pizzaInfo.observation}
							</div>
						) : null}
						<Separator className="my-2" />
					</p>
				</div>
			</div>
			<button
				onClick={handleCompleteOrder}
				className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200"
			>
				Concluir
			</button>
		</div>
	);
}
