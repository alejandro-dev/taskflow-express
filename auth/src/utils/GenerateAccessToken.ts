import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { RolesEnum } from "../enums/roles-enums";

// Parameters to generate JWT
interface dataRequest {
   email: string,
   id: mongoose.Types.ObjectId,
   role_id: RolesEnum
}

export const generateJWT = (data: dataRequest): string => { 
   if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables');

   const token = jwt.sign({
      email: data.email, 
      id: data.id,
      role_id: data.role_id
   }, 
   process.env.JWT_SECRET,
   {
       expiresIn: '5h'
   });

   return token;
}