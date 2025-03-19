import { z } from "zod";

/**
 * @description Schema to validate user registration data
 */
const registerSchema = z
   .object({
      email: z.string({required_error: "Email is required"}).email({ message: "Not a valid email" }),
      name: z.string({required_error: "Name is required"}),
      password: z.string({required_error: "Password is required"}).min(6, "Password must be at least 6 characters"),
      confirm_password: z.string({required_error: "Confirm password is required"})
   })
   .strict()
   .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirm_password"],
         });
      }
   });


/**
 * 
 * @description Validate user registration data
 * 
 * @param {any} data - User registration data
 * @param {string} data.email - Email of the user
 * @param {string} data.name - Name of the user
 * @param {string} data.password - Password of the user
 * @param {string} data.confirm_password - Confirm password of the user
 * 
 * @returns {string | null} Returns an error message if validation fails, otherwise null
 * 
 */
export const validateRegisterUser = (data: any): string | null => {
   try {
      registerSchema.parse(data);
      return null;

   } catch (error: any) {
      return error.errors.map((err: any) => err.message).join(", ");
   }
}