import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between m-5">
      <Link className="group" href="/">
        <h1 className="text-[25px] group-hover:text-[27px] transition-all duration-200">Pizza<strong className="text-orange-500 text-[25px] group-hover:text-[28px] transition-all duration-200">Hub</strong></h1>
      </Link>
      <div className="flex flex-row gap-5 items-center">
        <Link href="/Pizzas">
          <h1 className="hover:text-orange-400 transition-all">Pizzas</h1>
        </Link>
        <Link href="/Register">
          <h1 className="hover:text-orange-400 transition-all">Infromações</h1>
        </Link>
        <Link href="/Orders">
          <h1 className="hover:text-orange-400 transition-all">Pedidos</h1>
        </Link>
      </div>
      
    </header>
  );
}
