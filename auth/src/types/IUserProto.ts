import * as grpc from "@grpc/grpc-js";
import { IUser } from "./IUser";

// Define los tipos para los mensajes y servicios que están en el archivo .proto
export interface IUserProto {
   user: {
      CreateUserRequest: CreateUserRequest;
      CreateUserResponse: CreateUserResponse;
      LoginRequest: LoginRequest;
      LoginResponse: LoginResponse;
      VerifyAccountRequest: VerifyAccountRequest;
      VerifyAccountResponse: VerifyAccountResponse;
      VerifyAccessTokenRequest: VerifyAccessTokenRequest;
      VerifyAccessTokenResponse: VerifyAccessTokenResponse;
      ExistUserRequest: ExistUserRequest;
      ExistUserResponse: ExistUserResponse;
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

interface VerifyAccountRequest {
   token: string;
   requestId?: string;
}

interface VerifyAccountResponse {
   status: string;
   message: string;
}

interface VerifyAccessTokenRequest {
   token: string;
}

interface VerifyAccessTokenResponse {
   status: string;
}

interface ExistUserRequest {
   userId: string;
}

interface ExistUserResponse {
   status: string;
   message: string;
}