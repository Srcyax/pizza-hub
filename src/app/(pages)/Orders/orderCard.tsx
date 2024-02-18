import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Order {
    user: string;
    address: string;
    name: string;
    pizzaImg: string;
}

interface OrderCardProps {
    user: string;
    address: string;
    name: string;
    pizzaImg: string;
    orders: Order[];
    index: number;
    onOrderComplete: (index: number, order: Order) => void;
}

export default function OrderCard({ user, address, name, pizzaImg, orders, index, onOrderComplete }: OrderCardProps){
    const [isImageLoaded, setImageLoaded] = useState(false);

    const handleSetImageLoaded = () => {
      setImageLoaded(true);
    }
    
    const handleCompleteOrder = () => {
        const order = orders[index];
        onOrderComplete(index, order);
    };
    
    return (
        <div>
            <div className="border-2 rounded-lg flex flex-col justify-center items-center">
                {
                    !isImageLoaded ? <Skeleton className="rounded-xl w-[200px] h-[150px] m-5"/> : null
                }
                <LazyLoadImage className={isImageLoaded ? "m-5 rounded-xl h-36" : ""} beforeLoad={handleSetImageLoaded} src={"images/" + pizzaImg} width={200} alt="" />
                <h1>{name}</h1>
                <div className="flex flex-col gap-4 m-5 w-52">
                    <p className="text-center text-zinc-400">{"Cliente: " + user}</p>
                    <p className="text-center text-zinc-400">{"Endereço: " + address}</p>
                </div>
                <button onClick={handleCompleteOrder} className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">Concluir</button>
            </div>
        </div>
    );
}