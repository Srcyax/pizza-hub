import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row justify-between m-5">
      <h1 className="text-2xl">Pizza<strong className="text-orange-500 text-2xl">Hub</strong></h1>
      <Link href="/">
        <h1 className="hover:text-orange-400 transition-all">Pedidos</h1>
      </Link>
    </header>
  );
}
