// import express from "express";
import dotenv from "dotenv";
import amqp from "amqplib";
import mongoose from "mongoose";

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || '', {});

// Hability to file .env
dotenv.config({path: '.env'});

async function receiveMessages() {
   const connection = await amqp.connect(process.env.RMQ_URL!);
   const channel = await connection.createChannel();
   await channel.assertQueue("auth_queue", { durable: true });
 
   console.log("📥 Esperando mensajes en auth_queue...");
 
   channel.consume("auth_queue", async (msg) => {
      if (msg !== null) {
         const data = JSON.parse(msg.content.toString());
         console.log("🔑 Procesando autenticación:", data);
   
         // Simulación de autenticación
         if (data.usuario === "admin" && data.password === "1234") {
            console.log("✅ Usuario autenticado");
         } else {
            console.log("❌ Credenciales inválidas");
         }
   
         channel.ack(msg); // Confirmar que el mensaje fue recibido
      }
   });
}
 
receiveMessages().catch(console.error);

/*const app = express();

app.get("/", (req, res) => {
   res.send("¡Hola, mundo desde Express!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/