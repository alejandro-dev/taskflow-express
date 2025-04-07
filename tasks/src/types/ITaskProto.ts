import * as grpc from "@grpc/grpc-js";
import { ITask } from "./ITask";

// Define los tipos para los mensajes y servicios que están en el archivo .proto
export interface ITaskProto {
   task: {
      CreateTaskRequest: CreateTaskRequest;
      CreateTaskResponse: CreateTaskResponse;
      TaskService: {
         service: grpc.ServiceDefinition<any>;
      };
      // LoginRequest: LoginRequest;
      // LoginResponse: LoginResponse;
      // VerifyAccountRequest: VerifyAccountRequest;
      // VerifyAccountResponse: VerifyAccountResponse;
      // Task: ITask;
      // UserService: {
      //    service: grpc.ServiceDefinition<any>;
      // };
   };
}

interface CreateTaskRequest {
   title: string;
   description?: string;
   authorId: string;
   assignedUserId?: string;
   dueDate?: string;
   status: string;
   priority: string;
   requestId?: string;
}

interface CreateTaskResponse {
   status: string;
   message: string;
   task?: ITask;
}

// interface LoginRequest {
//    email: string;
//    password: string;
//    requestId?: string;
// }

// interface LoginResponse {
//    status: string;
//    message: string;
//    token?: string;
//    user?: IUser;
// }

// interface VerifyAccountRequest {
//    token: string;
//    requestId?: string;
// }

// interface VerifyAccountResponse {
//    status: string;
//    message: string;
// }