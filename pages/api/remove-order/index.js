import { orders } from "../orders/index";

export default function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "POST":
            const { order } = req.body;
            const index = orders.findIndex(item => item.name === order.name);

            if (index !== -1) {
                orders.splice(index, 1);
                return res.status(200).json({ message: "Success to remove" });
            } else {
                return res.status(404).json({ message: "Order not found" });
            }
    }
}
