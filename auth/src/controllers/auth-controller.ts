import * as grpc from "@grpc/grpc-js";
import { IUserProto } from "../types/IUserProto";
import { authService } from "../services/auth-service";
import { validateRegisterUser } from "../validators/registerValidator";

/**
 * @description Handles the user registration via gRPC.
 * 
 * @param {grpc.ServerUnaryCall<IUserProto["user"]["CreateUserRequest"], IUserProto["user"]["CreateUserResponse"]>} call - The gRPC request call containing user data.
 * @param {grpc.sendUnaryData<IUserProto["user"]["CreateUserResponse"]>} callback - The gRPC callback function to return a response.
 * 
 * @returns {Promise<void>} A promise that resolves when the user registration is successful.
 */
const createUser = async (
   call: grpc.ServerUnaryCall<IUserProto["user"]["CreateUserRequest"], IUserProto["user"]["CreateUserResponse"]>, 
   callback: grpc.sendUnaryData<IUserProto["user"]["CreateUserResponse"]>
): Promise<void> => {   
   // Validate user data
   const errorMessage = validateRegisterUser(call.request);
   if (errorMessage) return callback({ code: grpc.status.INVALID_ARGUMENT, message: errorMessage }, null);
 
   try {
      // Save user data
      const response = await authService.registerUserService(call.request) as IUserProto["user"]["CreateUserResponse"];

      // Return response
      callback(null, response);

   } catch (error: any) {
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
const login = async (
   call: grpc.ServerUnaryCall<IUserProto["user"]["LoginRequest"], IUserProto["user"]["LoginResponse"]>, 
   callback: grpc.sendUnaryData<IUserProto["user"]["LoginResponse"]>
): Promise<void> => {   
   // Validate user data
   // const errorMessage = validateRegisterUser(call.request);
   // if (errorMessage) return callback({ code: grpc.status.INVALID_ARGUMENT, message: errorMessage }, null);
 
   try {
      // Save user data
      const response = await authService.loginService(call.request) as IUserProto["user"]["LoginResponse"];

      // Return response
      callback(null, response);

   } catch (error: any) {
      callback(error, null);
   }
}
export default {
   createUser,
   login
}