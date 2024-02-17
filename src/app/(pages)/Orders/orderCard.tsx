interface Order {
    name: string;
}

interface OrderCardProps {
    title: string;
    orders: Order[];
    index: number;
    onOrderComplete: (index: number, order: Order) => void;
}

export default function OrderCard({ title, orders, index, onOrderComplete }: OrderCardProps){
    const handleCompleteOrder = () => {
        const order = orders[index];
        onOrderComplete(index, order);
    };
    return (
        <div>
            <div className="border-2 rounded-lg flex flex-col justify-center items-center">
                <img className="m-5" src="images/place_holder.png" width={150} alt="" />
                <h1>{title}</h1>
                <button onClick={handleCompleteOrder} className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">Concluir</button>
            </div>
        </div>
    );
}