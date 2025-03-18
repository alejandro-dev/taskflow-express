import mongoose, { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';
import { RolesEnum } from "../enums/roles-enums";
import { IUser } from "../types/IUser";

/**
 * 
 * @description User Schema
 *
 */
const userSchema = new Schema<IUser>({
   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
   password: { type: String, required: [true, 'You must provide a password'], minlength: 6 },
   role: { type: String, required: true, enum: Object.values(RolesEnum), default: RolesEnum.USER },
   active: { type: Boolean, default: false },
   token: { type: String, default: null },
}, {
   timestamps: true,
});

/**
 * 
 * @description Middleware "pre-save" to hash passwords
 * @param next
 * @returns {Promise<void>}
 */
userSchema.pre('save', async function(next: Function): Promise<void> {
   // If password is not modified, skip
   if (!this.isModified('password')) return next();

   // Hash password
   let hash = '';
   if(this.password !== undefined) hash = await bcrypt.hash(this.password, 12);
   this.password = hash;

   next();
});
   
// Middleware de "post-save" para manejar errores
// userSchema.post<IUser>('save', function(error: any, doc: IUser, next: Function)  {
//    console.log(error);
//    if (error.code === 11000) {
//        next(new Error('Ese correo ya está registrado'));
//    } else {
//        next(error);
//    }
// });

/**
 * 
 * @description Function to compare passwords
 * @param {string} password - Password to compare
 * @returns {boolean} - True if password is correct
 * 
 */
userSchema.methods.comparePassword = function(password: string): boolean {
   return bcrypt.compareSync(password, this.password);
};

// Create User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;