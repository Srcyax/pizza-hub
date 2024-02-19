"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignJustify } from "lucide-react";

export default function Header() {
	const [user, getUser] = useState<string>("");

	useEffect(() => {
		getUser(localStorage.getItem("user") ?? "");
	});

	return (
		<header className="flex flex-row justify-between m-5">
			<Link className="group" href="/">
				<h1 className="text-[25px] group-hover:text-[27px] transition-all duration-200">
					Pizza
					<strong className="text-orange-500 text-[25px] group-hover:text-[28px] transition-all duration-200">
						Hub
					</strong>
				</h1>
			</Link>
			<div className="flex flex-row gap-5 items-center">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline">
							<AlignJustify />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<div className="flex flex-row items-center gap-2">
							<Avatar>
								<AvatarFallback className="p-4">
									{user.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<label htmlFor="">{user}</label>
						</div>

						<div className="flex flex-col items-center m-14 gap-6">
							<Link href="/">
								<h1 className="text-[20px] hover:text-orange-400 transition-all">
									Home
								</h1>
							</Link>
							<Link href="/Pizzas">
								<h1 className="text-[20px] hover:text-orange-400 transition-all">
									Pizzas
								</h1>
							</Link>
							<Link href="/Orders">
								<h1 className="text-[20px] hover:text-orange-400 transition-all">
									Pedidos
								</h1>
							</Link>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
