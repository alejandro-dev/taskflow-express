import { z } from "zod";

/**
 * @description Schema to validate user registration data
 */
const loginSchema = z
   .object({
      email: z.string({required_error: "Email is required"}).email({ message: "Not a valid email" }),
      password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters")
   })
   .strict();

/**
 * 
 * @description Validate user registration data
 * 
 * @param {any} data - User registration data
 * @param {string} data.email - Email of the user
 * @param {string} data.password - Password of the user
 * 
 * @returns {string | null} Returns an error message if validation fails, otherwise null
 * 
 */
export const validateLoginUser = (data: any): string | null => {
   try {
      loginSchema.parse(data);
      return null;

   } catch (error: any) {
      return error.errors.map((err: any) => err.message).join(", ");
   }
}