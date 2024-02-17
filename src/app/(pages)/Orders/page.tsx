"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "./orderCard";

interface Order {
    name: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        axios.get("/api/orders").then(res => {
            setOrders(res.data.orders);
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
        <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
            {orders.map((order, index) => (
                    <div>
                        <OrderCard
                        key={index}
                        title={order.name}
                        orders={orders}
                        index={index}
                        onOrderComplete={handleOrderComplete}
                    />
                    </div>
                ))}
        </div>
            
    </main>
    );
}
