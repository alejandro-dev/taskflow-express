import * as grpc from "@grpc/grpc-js";
import { IUser } from "./IUser";

// Define los tipos para los mensajes y servicios que están en el archivo .proto
export interface IUserProto {
   user: {
      CreateUserRequest: CreateUserRequest;
      CreateUserResponse: CreateUserResponse;
      LoginRequest: LoginRequest;
      LoginResponse: LoginResponse;
      User: IUser;
      UserService: {
         service: grpc.ServiceDefinition<any>;
      };
   };
}

interface CreateUserRequest {
   email: string;
   name: string;
   password: string;
   confirm_password: string;
   requestId?: string;
}

interface CreateUserResponse {
   status: string;
   message: string;
   token?: string;
   user?: IUser;
}

interface LoginRequest {
   email: string;
   password: string;
   requestId?: string;
}

interface LoginResponse {
   status: string;
   message: string;
   token?: string;
   user?: IUser;
}