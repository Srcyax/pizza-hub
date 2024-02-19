const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
const port = 3001;

// Configuração do body-parser para lidar com JSON
app.use(bodyParser.json());
app.use(cors());

// Instanciando o cliente WhatsApp
const client = new Client();

client.on("qr", (qr) => {
	console.log("QR code recebido");
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log("Cliente está pronto!");
});

client.initialize();

// Rota para enviar mensagens
app.post("/enviar-mensagem", async (req, res) => {
	try {
		const { number, message } = req.body;
		const chat = await client.getChatById(`${number}@c.us`);
		await chat.sendMessage(message);
		res.status(200).json({ message: "Mensagem enviada com sucesso" });
	} catch (error) {
		console.error("Erro ao enviar mensagem:", error);
		res.status(500).json({ message: "Erro ao enviar mensagem" });
	}
});

// Iniciando o servidor
app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
