"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./orderCard";
import { Skeleton } from "@/components/ui/skeleton"

interface Order {
    user: string;
    address: string;
    name: string;
    pizzaImg: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersIsLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get("/api/orders").then(res => {
            setOrders(res.data.orders);
            setIsLoaded(true);
        });
    }, []);

    const handleOrderComplete = async (index: number, order: Order) => {
        try {
            await axios.post('/api/remove-order', { name: order.name });
            setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing order:', error);
        }
    };

    return (
    <main className="flex flex-col items-center justify-between">
        <h1>Pedidos:</h1>
        {
            ordersIsLoaded ? <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
            {
               (orders.map((order, index) => 
               (
                    <div key={index}>
                        <OrderCard
                            user={order.user}
                            address={order.address}
                            key={index}
                            name={order.name}
                            img={order.pizzaImg}
                            orders={orders}
                            index={index}
                            onOrderComplete={handleOrderComplete}
                        />
                    </div>
                )))
            }
            
        </div> : 
        <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
            <Skeleton className="h-[350px] w-[230px] rounded-lg" />
            <Skeleton className="h-[350px] w-[230px] rounded-lg" />
            <Skeleton className="h-[350px] w-[230px] rounded-lg" />
            <Skeleton className="h-[350px] w-[230px] rounded-lg" />
        </div>
        } 
    </main>
    );
}
