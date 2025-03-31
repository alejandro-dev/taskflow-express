import { RolesEnum } from "../enums/roles-enums";
import mongoose from "mongoose";

/**
 * 
 * @description User Interface
 *
 */
export interface IUser {
   _id: mongoose.Types.ObjectId;
   email: string;
   password: string;
   role: RolesEnum;
   active: boolean;
   token: string;
   comparePassword(password: string): boolean;
}