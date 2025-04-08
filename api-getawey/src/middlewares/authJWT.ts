import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import { convertGrpcErrorToHttp } from "../utils/errorHandler";

const authJWT = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // Get the authorization header
      const authHeader = req.get('Authorization'); //authHeader sería algo parecido a esto "Bearer eyJhbGciOiJI..."

      // Check if the header is present
      if(!authHeader) return res.status(400).send({ status: 'fail', message: "Token is required" });

      // Check if the header is in the correct format
      const token = authHeader!.split(' ')[1];

      // Call the AuthService to verify the token
      let authService: AuthService = new AuthService();
      await authService.verifyAccessToken({token});

      return next();

   } catch (error: any) {
      // If the error has a code, we map it to an HTTP code
      if (error.code) return convertGrpcErrorToHttp(error, res); 

      // If there is no specific code, we send an internal error
      res.status(500).json({ status: 'error', message: "Internal server error" });
   }
   
}
export default authJWT;