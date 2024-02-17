interface Order {
    user: string;
    address: string;
    pizzaName: string;
    pizzaImg: string;
}

interface OrderCardProps {
    user: string;
    address: string;
    pizzaName: string;
    img: string;
    orders: Order[];
    index: number;
    onOrderComplete: (index: number, order: Order) => void;
}

export default function OrderCard({ user, address, pizzaName, img, orders, index, onOrderComplete }: OrderCardProps){
    const handleCompleteOrder = () => {
        const order = orders[index];
        onOrderComplete(index, order);
    };
    return (
        <div>
            <div className="border-2 rounded-lg flex flex-col justify-center items-center">
                <img className="m-5 rounded-xl h-36" src={"images/" + img} width={200} alt="" />
                <h1>{pizzaName}</h1>
                <div className="flex flex-col gap-4 m-5 w-52">
                    <p className="text-center text-zinc-400">{"Cliente: " + user}</p>
                    <p className="text-center text-zinc-400">{"Endereço: " + address}</p>
                </div>
                <button onClick={handleCompleteOrder} className="border-2 rounded-lg p-3 m-5 hover:text-orange-500 transition-all duration-200">Concluir</button>
            </div>
        </div>
    );
}