import PizzaCardInfo from "./PizzaCard"

export default function Pizzas(){

    return (
        <main className="flex flex-col items-center justify-between">
            <div className="grid grid-cols-4 grid-rows-none place-content-center gap-10 m-10">
                <PizzaCardInfo user="Luiz" 
                address="Av elson soares" 
                pizzaImg="calabresa.png" 
                pizzaName="Calabresa" 
                pizzaDesc="Experimente nossa pizza de calabresa: uma combinação irresistível 
                de queijo derretido, molho de tomate caseiro e calabresa defumada, 
                perfeita para satisfazer seus desejos de pizza clássica e saborosa"
                />
                <PizzaCardInfo user="Gabriel" 
                address="Rua benedito sales" 
                pizzaImg="place_holder.png" 
                pizzaName="Bacon" 
                pizzaDesc="Experimente nossa pizza de calabresa: uma combinação irresistível 
                de queijo derretido, molho de tomate caseiro e calabresa defumada, 
                perfeita para satisfazer seus desejos de pizza clássica e saborosa"
                />
            </div>
        </main>
    )
}