import * as grpc from "@grpc/grpc-js";
import { IUser } from "./IUser";

// Define los tipos para los mensajes y servicios que están en el archivo .proto
export interface IUserProto {
   user: {
      UserRequest: UserRequest;
      UserResponse: UserResponse;
      CreateUserRequest: CreateUserRequest;
      CreateUserResponse: CreateUserResponse;
      User: IUser;
      UserService: {
         service: grpc.ServiceDefinition<any>;
      };
   };
}

interface UserRequest {
   id: string;
}

interface UserResponse {
   id: string;
   name: string;
   age: number;
}

interface CreateUserRequest {
   email: string;
   name: string;
   password: string;
   confirm_password: string;
}

interface CreateUserResponse {
   status: string;
   message: string;
   token?: string;
   user?: IUser;
   code?: number;
}