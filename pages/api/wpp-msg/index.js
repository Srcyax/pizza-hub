import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

let client;

async function initializeClient() {
	if (!client) {
		client = new Client({
			puppeteer: {
				headless: false,
			},
			authStrategy: new LocalAuth({
				clientId: "PizzaHub",
			}),
		});

		client.on("qr", (qr) => {
			console.log("QR code");
			qrcode.generate(qr, { small: true });
		});

		client.on("ready", () => {
			console.log("Client is ready");
		});

		await client.initialize();
	}
}

export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			try {
				await initializeClient();
				const { number, message } = req.body;
				const chat = await client.getChatById(`${number}@c.us`);
				await chat.sendMessage(message);
				return res.status(200).json({ message: "Message sent successfully" });
			} catch (error) {
				console.error("Error sending message: ", error);
				return res.status(500).json({ message: "Error sending message" });
			}
	}
}
