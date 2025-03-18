import { Request, Response } from "express";
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

export default {
   getUser
}