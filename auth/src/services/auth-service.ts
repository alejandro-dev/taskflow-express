import * as grpc from "@grpc/grpc-js";
import { IUserProto } from "../types/IUserProto";
import { userRepository } from "../repository/user-repository";
import { GrpcError } from "../utils/GrpcError";



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

         return { status: 'success', message: 'Usuario registrado correctamente', token: user!.token, user: user };

      } catch (error: any) {
         throw error;
      }
   }
}

export const authService = new AuthService();