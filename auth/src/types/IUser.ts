import { RolesEnum } from "../enums/roles-enums";

/**
 * 
 * @description User Interface
 *
 */
export interface IUser {
   id: string;
   email: string;
   password: string;
   role: RolesEnum;
   active: boolean;
   token: string;
}