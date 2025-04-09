import * as grpc from "@grpc/grpc-js";
import jwt from "jsonwebtoken";
import { GrpcError } from "./GrpcError";

export const signToken = (token: string) => {
   try{
      let userData = jwt.verify(token, process.env.JWT_SECRET!);

      // Validar que reviewToken sea un JwtPayload y si es un token válido pero hay algún error
      if (typeof userData !== 'object' || userData === null) throw new GrpcError("Invalid token", grpc.status.UNAUTHENTICATED);

      return { id: userData.id, role: userData.role }; 
       
   }catch (error) {
      throw new GrpcError("Invalid token", grpc.status.UNAUTHENTICATED);
   }  
}