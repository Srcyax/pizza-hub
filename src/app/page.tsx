"use client";
import React, { useState } from "react";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const [isImageLoaded, setImageLoaded] = useState(false);

	const handleSetImageLoaded = () => {
		setImageLoaded(true);
	};

	const { setTheme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		if (
			localStorage.getItem("user") === null ||
			localStorage.getItem("address") === null ||
			localStorage.getItem("number") === null
		) {
			router.push("/Register");
		}
		setTheme("dark");
	});

	return (
		<main className="flex flex-col items-center justify-center">
			<div className="flex flex-row max-[1024px]:flex-col items-center justify-center m-14 max-[768px]:m-20">
				<div className="flex flex-col items-center justify-center mb-60 max-[768px]:mb-10">
					<h1 className="text-4xl text-center mx-5">
						A melhor <strong className="text-orange-500">Pizzaria</strong> da região
					</h1>
					<p className="text-center text-zinc-400">
						Na nossa pizzaria, saboreie a excelência em cada fatia. <br /> Experimente
						hoje e descubra por que somos os favoritos da cidade!
					</p>
					<div className="grid grid-cols-3 gap-3 m-5">
						<a href="" target="_blank">
							<Instagram className="hover:text-orange-500 transition-colors" />
						</a>
						<a href="" target="_blanck">
							<Facebook className="hover:text-orange-500 transition-colors" />
						</a>
						<a href="" target="_black">
							<Twitter className="hover:text-orange-500 transition-colors" />
						</a>
					</div>
					<div className="mt-10">
						<Link
							href="/Pizzas"
							className="flex flex-row gap-2 hover:gap-5 px-10 py-4 border-2 border-orange-500 hover:bg-orange-500 transition-all duration-500 rounded-xl"
						>
							Saborear <ArrowRight />
						</Link>
					</div>
				</div>
				{!isImageLoaded ? (
					<Skeleton className="h-[400px] max-[768px]:h-[200px] w-[400px] max-[768px]:w-[200px] rounded-full m-14" />
				) : null}
				<LazyLoadImage
					beforeLoad={handleSetImageLoaded}
					src="images/pizza.png"
					alt="pizza_image"
					width={isImageLoaded ? 700 : 0}
				/>
			</div>
		</main>
	);
}
