export var orders = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      orders.push(req.body);
      console.log(orders);
      res.status(200).json({
        message: "Sucess",
        orders,
      });
      break;
    case "GET":
      res.status(200).json({ orders });
      break;
  }
}
