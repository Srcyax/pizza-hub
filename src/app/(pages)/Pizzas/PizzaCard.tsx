"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const payments = [
	{
		value: "dinheiro",
		label: "Dinheiro",
	},
	{
		value: "cartão",
		label: "Cartão",
	},
];
const delivery = [
	{
		value: "retirar",
		label: "Retirar",
	},
	{
		value: "entrega",
		label: "Entrega",
	},
];

interface CardInfo {
	user: string;
	address: string;
	pizzaImg: string;
	pizzaName: string;
	pizzaDesc: string;
}

interface PizzaInformation {
	additionals: string;
	observation: string;
	delivery_method: string;
	payment_method: string;
}

export default function PizzaCardInfo({
	user,
	address,
	pizzaImg,
	pizzaName,
	pizzaDesc,
}: CardInfo) {
	const [isImageLoaded, setImageLoaded] = useState(false);

	const handleSetImageLoaded = () => {
		setImageLoaded(true);
	};

	const [openPayment, setOpenPayment] = useState(false);
	const [openDelivery, setOpenDelivery] = useState(false);
	const [valuePayment, setValuePayment] = useState("");
	const [valueDelivery, setValueDelivery] = useState("");

	const [additionals, setAdditionals] = useState("");
	const [observation, setObservation] = useState("");
	const [deliveryMethod, setDeliveryMethod] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");

	var pizzaInfo: PizzaInformation;

	useEffect(() => {
		pizzaInfo = {
			additionals: additionals,
			observation: observation,
			delivery_method: deliveryMethod,
			payment_method: paymentMethod,
		};
	});

	return (
		<div className="border-2 rounded-lg flex flex-col justify-center items-center w-72">
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
			<h1 className="text-2xl">{pizzaName}</h1>
			<p className="text-center text-zinc-400 m-5">{pizzaDesc}</p>

			<AlertDialog>
				<AlertDialogTrigger className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">
					Pedir
				</AlertDialogTrigger>
				<AlertDialogContent className="">
					<AlertDialogHeader>
						<AlertDialogTitle>{"Olá, " + user}</AlertDialogTitle>
						<div className="flex flex-row max-[450px]:flex-col justify-between items-center max-[450px]:mx-11">
							<LazyLoadImage
								className="m-5 rounded-xl h-36"
								src={"images/" + pizzaImg}
								width={200}
								alt=""
							/>
							<p className="text-[13px] text-center max-[450px]:text-[11px] max-[450px]:text-white text-zinc-400">
								{pizzaDesc}
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-[14px]">Adicionais:</h1>
							<div className="flex flex-col gap-2">
								<div className="flex items-center space-x-2">
									<Checkbox
										onCheckedChange={(checked) => {
											return checked
												? setAdditionals("Borda recheada")
												: setAdditionals("");
										}}
									/>
									<label className="text-sm text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										Borda recheada
									</label>
								</div>
							</div>
							<div className="flex flex-col my-3">
								<label htmlFor="" className="my-1 text-[14px]">
									Deixe sua observação
								</label>
								<Textarea
									onChange={(e) => setObservation(e.target.value)}
									placeholder="Observações sobre o pedido."
									id="message"
								/>
							</div>
							<div className="flex flex-row gap-5">
								<div className="flex flex-col">
									<label className="my-1 text-[14px]" htmlFor="">
										Entrega ou retirada
									</label>
									<Popover open={openDelivery} onOpenChange={setOpenDelivery}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={openDelivery}
												className="w-[200px] justify-between"
											>
												{valueDelivery
													? delivery.find((delivery) => delivery.value === valueDelivery)
															?.label
													: "Selecione"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search framework..." />
												<CommandEmpty>No framework found.</CommandEmpty>
												<CommandGroup>
													{delivery.map((delivery) => (
														<CommandItem
															key={delivery.value}
															value={delivery.value}
															onSelect={(currentValue) => {
																setDeliveryMethod(
																	currentValue === valueDelivery ? "" : currentValue
																);
																setValueDelivery(
																	currentValue === valueDelivery ? "" : currentValue
																);
																setOpenDelivery(false);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	valueDelivery === delivery.value ? "opacity-100" : "opacity-0"
																)}
															/>
															{delivery.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-col">
									<label className="my-1 text-[14px]" htmlFor="">
										Método de pagamento
									</label>
									<Popover open={openPayment} onOpenChange={setOpenPayment}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={openPayment}
												className="w-[200px] justify-between"
											>
												{valuePayment
													? payments.find((payments) => payments.value === valuePayment)
															?.label
													: "Selecione"}
												<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search framework..." />
												<CommandEmpty>No framework found.</CommandEmpty>
												<CommandGroup>
													{payments.map((payments) => (
														<CommandItem
															key={payments.value}
															value={payments.value}
															onSelect={(currentValue) => {
																setPaymentMethod(
																	currentValue === valuePayment ? "" : currentValue
																);

																setValuePayment(
																	currentValue === valuePayment ? "" : currentValue
																);
																setOpenPayment(false);
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	valuePayment === payments.value ? "opacity-100" : "opacity-0"
																)}
															/>
															{payments.label}
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								if (paymentMethod === "") {
									toast("Erro!", {
										description:
											"Por favor selecione corretamente o Método de pagamento.",
										action: {
											label: "Ok",
											onClick: () => console.log("Undo"),
										},
										duration: 3000,
									});

									return;
								}

								if (deliveryMethod === "") {
									toast("Erro!", {
										description: "Por favor selecione corretamente o Método de entrega.",
										action: {
											label: "Ok",
											onClick: () => console.log("Undo"),
										},
										duration: 3000,
									});

									return;
								}

								axios
									.post("/api/orders", {
										user: user,
										address: address,
										name: pizzaName,
										desc: pizzaDesc,
										pizzaInfo: pizzaInfo,
										pizzaImg: pizzaImg,
									})
									.then((res) => {
										toast("Olá " + user, {
											description:
												"Estamos trabalhando para prepará-lo e estamos prevendo uma entrega no endereço: " +
												address +
												" em apenas 40 minutos.",
											action: {
												label: "Undo",
												onClick: () => console.log("Undo"),
											},
											duration: 3000,
										});
									});
							}}
						>
							Concluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
