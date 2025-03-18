import express from "express";
import dotenv from "dotenv";
import amqp from "amqplib";
import { AuthRoutes } from "./routes";

const app = express();

// Hability to file .env
dotenv.config();

// Hability to receive JSON
app.use(express.json());

// async function sendMessage(queue: string, message: any) {
//    const connection = await amqp.connect(process.env.RMQ_URL!);
//    const channel = await connection.createChannel();
//    await channel.assertQueue(queue, { durable: true });
//    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
//    console.log(`📩 Mensaje enviado a la cola ${queue}:`, message);
//    setTimeout(() => connection.close(), 500);
// }

// app.post("/auth/login", async (req, res) => {
//    await sendMessage("auth_queue", req.body);
//    res.json({ message: "Solicitud enviada a Auth Service" });
// });

// Add the apiRouter to the app
app.use('/auth', AuthRoutes);


export default app;
