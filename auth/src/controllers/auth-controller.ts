import { NextFunction, Request, Response } from "express";
import { body, Meta, validationResult } from "express-validator";
import crypto from "crypto";
import * as grpc from "@grpc/grpc-js";
import User from "../models/User";
import AuthService from "../services/auth-service";

const validateRegisterUser = [
   body('email')
      .escape().trim()
      .isEmail().withMessage('El email no es correcto'),
   body('name')
      .escape().trim()
      .notEmpty().withMessage('Debes añadir un nombre'),
   body('password')
      .trim().escape() // Elimina espacios y escapa caracteres especiales
      .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres')
      .notEmpty().withMessage('El password no puede estar vacío'),
   body('confirm_password')
      .trim().escape() // Elimina espacios y escapa caracteres especiales
      .notEmpty().withMessage('El confirmar password no puede estar vacío')
      .custom((value: string, { req }: Meta) => {
         // Aquí accedemos correctamente a req.body.password
         return value === req.body.password; // Comparar con el password en req.body

      }).withMessage('El password es diferente'),

   (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         //return next(new ValidationError("Rellena todos los campos con valores correctos", errors.array()));
      }
      return next();
   }
];

//Registro de usuario
const registerUser = async (req: Request, res: Response) => {
   //Ponemos por defecto el rol del trabajador
   req.body.role_id = '670d684e6fabc7dbf9bca8b5';
   
   //Leer los datos del usuario
   const user = new User({
      email: req.body.email,
      name: { value: req.body.name, verify: false },
      password: req.body.password,
      role_id: req.body.role_id,
   });

   try {
      //Generamos un token para verificar la cuenta
      user.token = crypto.randomBytes(20).toString('hex');

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

      res.json({message: 'Usuario registrado correctamente'});

   } catch (error) {
      console.log(error);
      res.json({message: 'Hubo un error'});
   }
}

const getUser = async (call: any, callback: any) => {
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
   getUser
}
