import * as grpc from "@grpc/grpc-js";
import { IUserProto } from "../types/IUserProto";
import { userRepository } from "../repository/user-repository";
import { GrpcError } from "../utils/GrpcError";
import { generateJWT } from "../utils/GenerateAccessToken";
import mongoose from "mongoose";

class AuthService {    
   /**
    * @description Register a new user
    * 
    * @param {IUserProto["user"]["CreateUserRequest"]} userData - User data to register
    * @param {string} userData.email - Email of the user
    * @param {string} userData.name - Name of the user
    * @param {string} userData.password - Password of the user
    * @param {string} userData.confirm_password - Confirm password of the user
    *
    * @returns {Promise<Object>} A promise that resolves with the user registration response.
    */     
   registerUserService = async (userData: IUserProto["user"]["CreateUserRequest"]): Promise<object> => {
      try {
         // Check if user already exists
         const existUser = await userRepository.findUserByEmail(userData.email);
         if(existUser) throw new GrpcError("User already exists", grpc.status.ALREADY_EXISTS);
         
         // Save user data
         const user = await userRepository.createUser(userData);

         //Generamos la url con el token
         //const custom_url = `http://${req.headers.host}/auth/verify_account/${user.token}`;
         //const custom_url = `${process.env.FRONTEND_URL}/account_confirmed/${user.token}`;

         // //Envíamos el email
         // sendEmail(
         //    user.email,
         //    'Diversifyhut - Verificación de cuenta',
         //    {name: user.name.value, custom_url},
         //    'verify_account.html'
         // );

         return { status: 'success', message: 'Register user success', token: user!.token, user: user };

      } catch (error: any) {
         throw error;
      }
   }

   /**
    * @description Login a user
    * 
    * @param {IUserProto["user"]["LoginRequest"]} userData - User data to login
    * @param {string} userData.email - Email of the user
    * @param {string} userData.password - Password of the user
    * 
    * @returns {Promise<Object>} A promise that resolves with the user login response.
    */
   loginService = async (userData: IUserProto["user"]["LoginRequest"]): Promise<object> => {
      try {
         //Extract email and password from request
         const { email, password } = userData;

         // Check if user already exists
         const user = await userRepository.findUserByEmail(email);
         if(!user) throw new GrpcError("Email or password incorrect", grpc.status.NOT_FOUND);

         // Check if the password is correct
         const isMatch = user.comparePassword(password);
         if(!isMatch) throw new GrpcError("Email or password incorrect", grpc.status.NOT_FOUND);

         // Check if user is active
         if(!user.active) throw new GrpcError("User is not active", grpc.status.UNAUTHENTICATED);

         // Generate token for user
         const token = generateJWT({
            email: user.email,
            id: user._id,
            role_id: user.role
         });

         return { status: 'success', message: 'User logged', token, user };

      } catch (error: any) {
         throw error;
      }
   }
}

export const authService = new AuthService();