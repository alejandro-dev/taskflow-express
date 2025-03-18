import dotenv from "dotenv";
// import amqp from "amqplib";
import mongoose from "mongoose";
import "./server"; // Importa y ejecuta el servidor

// Hability to file .env
dotenv.config();

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || '', {});

// Escuchar eventos de conexión
mongoose.connection.on('connected', () => {
   console.log('Conexión a MongoDB establecida');
});

mongoose.connection.on('error', (err) => {
   console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
   console.log('Desconectado de MongoDB');
});
 
// async function receiveMessages() {
//    const connection = await amqp.connect(process.env.RMQ_URL!);
//    const channel = await connection.createChannel();
//    await channel.assertQueue("auth_queue", { durable: true });
 
//    console.log("📥 Esperando mensajes en auth_queue...");
 
//    channel.consume("auth_queue", async (msg) => {
//       if (msg !== null) {
//          const data = JSON.parse(msg.content.toString());
//          console.log("🔑 Procesando autenticación:", data);
   
//          // Simulación de autenticación
//          if (data.usuario === "admin" && data.password === "1234") {
//             console.log("✅ Usuario autenticado");
//          } else {
//             console.log("❌ Credenciales inválidas");
//          }
   
//          channel.ack(msg); // Confirmar que el mensaje fue recibido
//       }
//    });
// }
 
// receiveMessages().catch(console.error);