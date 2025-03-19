import { Request, Response } from "express";
import { authService } from "../services/auth-service";
import { convertGrpcErrorToHttp } from "../utils/errorHandler";

/**
 * @route POST /register
 * @description Register a new user
 * 
 * @param {Request} req - Request object
 * @param {string} req.body.email - Email of the user
 * @param {string} req.body.name - Name of the user
 * @param {string} req.body.password - Password of the user
 * @param {string} req.body.confirm_password - Confirm password of the user
 * @param {Response} res - Response object
 * 
 * @returns {Promise<void>} A promise that resolves when the user registration is successful.
 * 
 */
const register = async (req: Request, res: Response): Promise<void> => {
   try {
      const response = await authService.register(req.body);
      res.json(response);

   } catch (error: any) {
      // If the error has a code, we map it to an HTTP code
      if (error.code) return convertGrpcErrorToHttp(error, res); 

      // If there is no specific code, we send an internal error
      res.status(500).json({ error: "Internal server error" });
   }
}

export default {
   register
}