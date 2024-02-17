"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./orderCard";
import { Skeleton } from "@/components/ui/skeleton"

interface Order {
    name: string;
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
            await axios.post('/api/remove-order', { order });
            setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error removing order:', error);
        }
    };

    return (
    <main className="flex flex-col items-center justify-between">
        <h1>Orders:</h1>
        {
            ordersIsLoaded ? <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
            {
               (orders.map((order, index) => (
                    <div key={index}>
                        <OrderCard
                            title={order.name}
                            orders={orders}
                            index={index}
                            onOrderComplete={handleOrderComplete}
                        />
                    </div>
                )))
            }
            
        </div> : 
        <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
            <Skeleton className="h-[270px] w-[250px] rounded-xl" />
            <Skeleton className="h-[270px] w-[250px] rounded-xl" />
            <Skeleton className="h-[270px] w-[250px] rounded-xl" />
            <Skeleton className="h-[270px] w-[250px] rounded-xl" />
        </div>
        } 
    </main>
    );
}
