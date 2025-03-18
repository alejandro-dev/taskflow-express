import { NextFunction, Request, Response } from "express";
import * as grpc from "@grpc/grpc-js";
import AuthService from "../services/auth-service";

const getUser = async (req: Request, res: Response) => {
   try {
      const response = await AuthService.getUser(req.params.id);
      console.log('response', response);
      res.json({ status: 'success', response });  

   } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: "Error obteniendo usuario" });
   }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const response = await AuthService.register(req.body);
      res.json(response);

   } catch (error: any) {
      if(error.code === grpc.status.INVALID_ARGUMENT) {
         res.status(400).json({ status: "fail", message: error.message });
         return next()
      }
      res.status(500).json({ error: "Error al registrar el usuario" });
   }
}

export default {
   getUser,
   register
}