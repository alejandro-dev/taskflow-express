import crypto from "crypto";
import * as grpc from "@grpc/grpc-js";
import { RolesEnum } from "../enums/roles-enums";
import User from "../models/User";
import { IUserProto } from "../types/IUserProto";
import { IUser } from "../types/IUser";
import { Types } from "mongoose";
import { GrpcError } from "../utils/GrpcError";

export class UserRepository {
   /**
    * 
    * @description Register a new user and send data to auth microservice
    * 
    * @param {Object} userData - User data to register
    * @param {string} userData.email - Email of the user
    * @param {string} userData.name - Name of the user
    * @param {string} userData.password - Password of the user
    * @param {string} userData.confirm_password - Confirm password of the user
    *
    * @returns {Promise<IUser>} A promise that resolves with the user data.
    */
   async createUser(userData: IUserProto["user"]["CreateUserRequest"]): Promise<IUser | null> {
      try {
         // Read user data
         const user = new User({
            email: userData.email,
            name: { value: userData.name, verify: false },
            password: userData.password,
            role: RolesEnum.USER,
         });

         // Generate token for user to verify account
         user.token = crypto.randomBytes(20).toString('hex');

         // Save user data
         return await user.save();

      } catch (error) {
         // Handle error
         throw new Error("Error al registrar un usuario");
      }
   }

   /**
    * 
    * @description Find a user by email
    * 
    * @param {string} email - Email of the user
    *
    * @returns {Promise<IUser | null>} A promise that resolves with the user data.
    */
   async findUserByEmail(email: string): Promise<IUser | null> {
      try {
         return await User.findOne({ email });

      } catch (error) {
         // Handle error
         throw new Error("Error al obtener usuario");
      }
   }

   /**
    * 
    * @description Find a user by token
    * 
    * @param {string} token - Token to verify account
    *
    * @returns {Promise<IUser | null>} A promise that resolves with the user data.
    */
   async findUserByToken(token: string): Promise<IUser | null> {
      try {
         return await User.findOne({ token });

      } catch (error) {
         // Handle error
         throw new Error("Error al obtener usuario");
      }
   }

   /**
    * 
    * @description Find a user by user id
    * 
    * @param {string} userId - User id to find user
    *
    * @returns {Promise<IUser | null>} A promise that resolves with the user data.
    */
   async findUserById(userId: string): Promise<IUser | null> {
      try {
         return await User.findById(userId);

      } catch (error) {
         // Handle error
         throw new Error("Error al obtener usuario");
      }
   }

   /**
    * 
    * @description Verify account
    * 
    * @param {string} token - Token to verify account
    *
    * @returns {Promise<IUser | null>} A promise that resolves with the user data. 
    */
   async activateAccount(userId: Types.ObjectId): Promise<IUser | null> {
      try {
         // Find user and update active
         const user = await User.findById(userId);
         if (!user) throw new GrpcError("Token incorrect", grpc.status.NOT_FOUND);

         user.active = true;
         user.token = undefined;

         // Save user data
         return await user!.save();

      } catch (error) {
         // Handle error
         throw new Error("Error al verificar cuenta");
      }
   }
}

// export const userRepository = new UserRepository();