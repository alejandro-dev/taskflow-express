import * as grpc from "@grpc/grpc-js";
import { v4 as uuidv4 } from 'uuid';
import { IUserProto } from "../types/IUserProto";
import { AuthService } from "../services/auth-service";
import { LogsService } from "../services/logs-service";
import { QueuesEnum } from "../enums/queues-enums";
import { QueueService } from "../services/queue-service";

export class AuthController {
   private authService: AuthService;
   private logsService: LogsService;
   
   constructor(authService: AuthService) {
      this.authService = authService;
      this.logsService = new LogsService(new QueueService());
   }

   /**
    * @description Handles the user registration via gRPC.
    * 
    * @param {grpc.ServerUnaryCall<IUserProto["user"]["CreateUserRequest"], IUserProto["user"]["CreateUserResponse"]>} call - The gRPC request call containing user data.
    * @param {grpc.sendUnaryData<IUserProto["user"]["CreateUserResponse"]>} callback - The gRPC callback function to return a response.
    * 
    * @returns {Promise<void>} A promise that resolves when the user registration is successful.
    */
   createUser = async (
      call: grpc.ServerUnaryCall<IUserProto["user"]["CreateUserRequest"], IUserProto["user"]["CreateUserResponse"]>, 
      callback: grpc.sendUnaryData<IUserProto["user"]["CreateUserResponse"]>
   ): Promise<void> => {   
      try {
         // Save user data
         const response = await this.authService.registerUserService(call.request) as IUserProto["user"]["CreateUserResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         this.logsService.sendLogs(QueuesEnum.LOGS, call.request.requestId || uuidv4(), 'auth', call.request.email.toString(), 'auth.create', error.message, error);
         
         console.log(error);
         callback(error, null);
      }
   }

   /**
    * @description Handles the user login via gRPC.
    * 
    * @param {grpc.ServerUnaryCall<IUserProto["user"]["LoginRequest"], IUserProto["user"]["LoginResponse"]>} call - The gRPC request call containing user data.
    * @param {grpc.sendUnaryData<IUserProto["user"]["LoginResponse"]>} callback - The gRPC callback function to return a response.
    * 
    * @returns {Promise<void>} A promise that resolves when the user login is successful.
    */
   login = async (
      call: grpc.ServerUnaryCall<IUserProto["user"]["LoginRequest"], IUserProto["user"]["LoginResponse"]>, 
      callback: grpc.sendUnaryData<IUserProto["user"]["LoginResponse"]>
   ): Promise<void> => {    
      try {
         // Save user data
         const response = await this.authService.loginService(call.request) as IUserProto["user"]["LoginResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         this.logsService.sendLogs(QueuesEnum.LOGS, call.request.requestId || uuidv4(), 'auth', call.request.email.toString(), 'auth.login', error.message, error);

         callback(error, null);
      }
   }

   /**
    * 
    * @description Verify account
    * 
    * @param {grpc.ServerUnaryCall<IUserProto["user"]["VerifyAccountRequest"], IUserProto["user"]["VerifyAccountResponse"]>} call - The gRPC request call containing verify account request.
    * @param {grpc.sendUnaryData<IUserProto["user"]["VerifyAccountResponse"]>} callback - The gRPC callback function to return a response.
    * 
    * @returns {Promise<void>} - A promise that resolves when the verify account request is completed.
    */
   verifyAccount = async (
      call: grpc.ServerUnaryCall<IUserProto["user"]["VerifyAccountRequest"], IUserProto["user"]["VerifyAccountResponse"]>, 
      callback: grpc.sendUnaryData<IUserProto["user"]["VerifyAccountResponse"]>
   ): Promise<void> => {
      try {
         // User verify account
         const response = await this.authService.verifyAccountService(call.request) as IUserProto["user"]["VerifyAccountResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         //this.logsService.sendLogs(QueuesEnum.LOGS, call.request.requestId || uuidv4(), 'auth', call.request.email.toString(), 'auth.verify', error.message, error);

         callback(error, null);
      }
   }

   /**
    * 
    * @description Verify access token
    * 
    * @param {grpc.ServerUnaryCall<IUserProto["user"]["VerifyAccessTokenRequest"], IUserProto["user"]["VerifyAccessTokenResponse"]>} call - The gRPC request call containing verify access token request.
    * @param {grpc.sendUnaryData<IUserProto["user"]["VerifyAccessTokenResponse"]>} callback - The gRPC callback function to return a response.
    * 
    * @returns {Promise<void>} - A promise that resolves when the verify access token request is completed.
    */
   verifyAccessToken = async (
      call: grpc.ServerUnaryCall<IUserProto["user"]["VerifyAccessTokenRequest"], IUserProto["user"]["VerifyAccessTokenResponse"]>,
      callback: grpc.sendUnaryData<IUserProto["user"]["VerifyAccessTokenResponse"]>
   ): Promise<void> => {   
      try {
         // Check if the token is valid
         const response = await this.authService.verifyAccessTokenService(call.request) as IUserProto["user"]["VerifyAccessTokenResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         callback(error, null);
         
      }
   }

   existUser = async (
      call: grpc.ServerUnaryCall<IUserProto["user"]["ExistUserRequest"], IUserProto["user"]["ExistUserResponse"]>,
      callback: grpc.sendUnaryData<IUserProto["user"]["ExistUserResponse"]>
   ) => {
      try {
         // Call the auth service
         const response = await this.authService.existUserService(call.request) as IUserProto["user"]["ExistUserResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         callback(error, null);
         
      }
   }
}
