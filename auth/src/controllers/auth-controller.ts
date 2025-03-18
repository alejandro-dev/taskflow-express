import crypto from "crypto";
import * as grpc from "@grpc/grpc-js";
import { z } from "zod";
import User from "../models/User";
import AuthService from "../services/auth-service";
import { IUserProto } from "../types/IUserProto";
import { RolesEnum } from "../enums/roles-enums";
import mongoose from "mongoose";

// Esquema de validación con Zod
const registerSchema = z
   .object({
      email: z.string({required_error: "Email is required"}).email({ message: "Not a valid email" }),
      name: z.string({required_error: "Name is required"}),
      password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
      confirm_password: z.string({required_error: "Confirm password is required"})
   })
   .strict()
   .superRefine((data, ctx) => {
      console.log('data', data) 
      if (data.password !== data.confirm_password) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirm_password"],
         });
      }
   });

// Middleware de validación con Zod
const validateRegisterUser = (data: any): string | null => {
   try {
      registerSchema.parse(data);
      return null;

   } catch (error: any) {
      return error.errors.map((err: any) => err.message).join(", ");
   }
}

const createUser = async (
   call: grpc.ServerUnaryCall<IUserProto["user"]["CreateUserRequest"], IUserProto["user"]["CreateUserResponse"]>, 
   callback: grpc.sendUnaryData< IUserProto["user"]["CreateUserResponse"]>
) => {   
   const errorMessage = validateRegisterUser(call.request);
   if (errorMessage) return callback({ code: grpc.status.INVALID_ARGUMENT, message: errorMessage }, null);
 
   // Read user data
   const user = new User({
      email: call.request.email,
      name: { value: call.request.name, verify: false },
      password: call.request.password,
      role_id: RolesEnum.ADMIN,
   });

   try {
      //Generamos un token para verificar la cuenta
      user.token = crypto.randomBytes(20).toString('hex');
      console.log(user);
      //Guardamos los datos en la bd
      await user.save();

      //Generamos la url con el token
      //const custom_url = `http://${req.headers.host}/auth/verify_account/${user.token}`;
      const custom_url = `${process.env.FRONTEND_URL}/account_confirmed/${user.token}`;

      // //Envíamos el email
      // sendEmail(
      //    user.email,
      //    'Diversifyhut - Verificación de cuenta',
      //    {name: user.name.value, custom_url},
      //    'verify_account.html'
      // );

      const response = { status: 'success', message: 'Usuario registrado correctamente', token: user.token, user: user };
      callback(null, response);

   } catch (error) {
      console.log(error);
      callback({
         code: grpc.status.INTERNAL,
         message: "Error al registrar un usuario",
      } as unknown as grpc.ServerErrorResponse);
   }
}

const getUser = async (call: grpc.ServerUnaryCall<IUserProto["user"]["UserRequest"], IUserProto["user"]["UserResponse"]>, callback: grpc.sendUnaryData< IUserProto["user"]["UserResponse"]>) => {
   try {
      const user = AuthService.getUserService(call.request.id);

      if (!user) callback({ code: grpc.status.NOT_FOUND, message: "User not found" });

      callback(null, user);

   } catch (error) {
      console.error(error);
      callback({
         code: grpc.status.INTERNAL,
         message: "Error obteniendo usuario",
      } as unknown as grpc.ServerErrorResponse);
   }
}

export default {
   createUser,
   getUser
}