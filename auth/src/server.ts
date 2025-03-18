import * as grpc from "@grpc/grpc-js";
import authController from "./controllers/auth-controller";
import dotenv from "dotenv";
import userProto from "./grpc/auth-loader";

// Cargar variables de entorno
dotenv.config();

const server = new grpc.Server();

server.addService(userProto.user.UserService.service, authController);

server.bindAsync(
   "0.0.0.0:50051",
   grpc.ServerCredentials.createInsecure(),
   (err, port) => {
      if (err) {
         console.error("Error starting server:", err);
         return;
      }
      console.log(`🚀 gRPC Server running on port ${port}`);
   }
);
