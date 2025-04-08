import * as grpc from "@grpc/grpc-js";
import jwt from "jsonwebtoken";
import { GrpcError } from "./GrpcError";

export const signToken = (token: string) => {
   try{
      let reviewToken = jwt.verify(token, process.env.JWT_SECRET!);
      console.log(reviewToken);
      // Validar que reviewToken sea un JwtPayload y si es un token válido pero hay algún error
      if (typeof reviewToken !== 'object' || reviewToken === null) throw new GrpcError("Invalid token", grpc.status.UNAUTHENTICATED);

      return token; 
      
   }catch (error) {
      throw new GrpcError("Invalid token", grpc.status.UNAUTHENTICATED);
   }  
}