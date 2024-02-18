"use client";
import axios from "axios";
import { useState } from "react";
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

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface CardInfo {
  user: string;
  address: string;
  pizzaImg: string;
  pizzaName: string;
  pizzaDesc: string;
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{"Olá, " + user}</AlertDialogTitle>
            <div className="flex flex-row justify-between items-center">
              <LazyLoadImage
                className="m-5 rounded-xl h-36"
                src={"images/" + pizzaImg}
                width={200}
                alt=""
              />
              <p className="text-[13px] text-zinc-400">{pizzaDesc}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-[14px]">Adicionais:</h1>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
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
                  placeholder="Observações sobre o pedido."
                  id="message"
                />
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                  <label className="my-1 text-[14px]" htmlFor="">
                    Entrega ou retirada
                  </label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Retirar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="retirar">Retirar</SelectItem>
                        <SelectItem value="entrega">Entrega</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label className="my-1 text-[14px]" htmlFor="">
                    Método de pagamento
                  </label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Dinheiro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="cartao">Cartão</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                axios
                  .post("/api/orders", {
                    user: user,
                    address: address,
                    name: pizzaName,
                    desc: pizzaDesc,
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
