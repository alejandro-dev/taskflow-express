import dotenv from "dotenv";
//import amqp from "amqplib";
import mongoose from "mongoose";
// import * as grpc from '@grpc/grpc-js'
// import * as protoLoader from "@grpc/proto-loader";
import "./server"; // Importa y ejecuta el servidor


// const PROTO_PATH = __dirname + "/user.proto";
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
// const userProto = grpc.loadPackageDefinition(packageDefinition) as any;

// const server = new grpc.Server();

// server.addService(userProto.user.UserService.service, AuthController.getUser);

// server.addService(userProto.user.UserService.service, {
//    GetUser: (call: any, callback: any) => {
//       const user = users[call.request.id];
//       if (user) {
//          callback(null, user);
//       } else {
//          callback({ code: grpc.status.NOT_FOUND, message: "User not found" });
//       }
//    },
// });

// server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
//    if (err) {
//      console.error("Error starting server:", err);
//      return;
//    }
//    console.log(`🚀 gRPC Server running on port ${port}`);
//  });

// Hability to file .env
dotenv.config();

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || '', {});

/*async function receiveMessages() {
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
 
receiveMessages().catch(console.error);*/

/*const app = express();

app.get("/", (req, res) => {
   res.send("¡Hola, mundo desde Express!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/