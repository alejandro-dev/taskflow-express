import * as grpc from "@grpc/grpc-js";
import dotenv from "dotenv";
import userProto from "./grpc/auth-loader";
import { AuthService } from "./services/auth-service";
import { AuthController } from "./controllers/auth-controller";
import { UserRepository } from "./repository/user-repository";
import { QueueService } from "./services/queue-service";

// Cargar variables de entorno
dotenv.config();

const server = new grpc.Server();

const queueService = new QueueService();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository); // Asegúrate de que AuthService está definido
const authController = new AuthController(authService);

server.addService(userProto.user.UserService.service,{
   createUser: authController.createUser.bind(authController),
   login: authController.login.bind(authController),
});

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
