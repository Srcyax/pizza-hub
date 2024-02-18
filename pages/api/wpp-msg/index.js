const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");

const client = new Client();

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {});

client.initialize();

export async function handler(req, res) {
	switch (method) {
		case "POST":
			try {
				const chat = await client.getChatById(`${req.body.number}@c.us`);
				await chat.sendMessage(req.body.message);
				console.log("Mensagem enviada com sucesso!");
			} catch (error) {
				console.error("Erro ao enviar mensagem:", error);
			}
	}
}
