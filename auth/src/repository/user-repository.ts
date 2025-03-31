import crypto from "crypto";
import { RolesEnum } from "../enums/roles-enums";
import User from "../models/User";
import { IUserProto } from "../types/IUserProto";
import { IUser } from "../types/IUser";

export class UserRepository {
   async createUser(userData: IUserProto["user"]["CreateUserRequest"]) {
      try {
         // Read user data
         const user = new User({
            email: userData.email,
            name: { value: userData.name, verify: false },
            password: userData.password,
            role_id: RolesEnum.USER,
         });

         // Generate token for user to verify account
         user.token = crypto.randomBytes(20).toString('hex');

         // Save user data
         return await user.save();

      } catch (error) {
         // Handle error
         throw new Error("Error al registrar un usuario");
      }
   }

   async findUserByEmail(email: string): Promise<IUser | null> {
      try {
         return await User.findOne({ email });

      } catch (error) {
         // Handle error
         throw new Error("Error al obtener usuario");
      }
   }
}

// export const userRepository = new UserRepository();