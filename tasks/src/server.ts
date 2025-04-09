import * as grpc from "@grpc/grpc-js";
import dotenv from "dotenv";
import { TasksService } from "./services/tasks-service";
import { TasksController } from "./controllers/tasks-controller";
import taskProto from "./grpc/tasks-loader";
import { TasksRepository } from "./repository/tasks-repository";

// Hability to file .env
dotenv.config();

// import { AuthService } from "./services/auth-service";
// import { AuthController } from "./controllers/auth-controller";
// import { UserRepository } from "./repository/user-repository";
// import { QueueService } from "./services/queue-service";

const server = new grpc.Server();

// const queueService = new QueueService();
const tasksRepository = new TasksRepository();
const taskService = new TasksService(tasksRepository); // Asegúrate de que AuthService está definido
const tasksController = new TasksController(taskService);

server.addService(taskProto.task.TaskService.service,{
   createTask: tasksController.createTask.bind(tasksController),
});

server.bindAsync(
   "0.0.0.0:" + process.env.GRPC_PORT,
   grpc.ServerCredentials.createInsecure(),
   (err, port) => {
      if (err) {
         console.error("Error starting server:", err);
         return;
      }
      console.log(`🚀 gRPC Server running on port ${port}`);
   }
);
