import mongoose, { Mongoose, Schema } from "mongoose";
import { ILog } from "../types/ILog";

/**
 * 
 * @description Log Schema
 *
 */
const logSchema = new Schema<ILog>({
   level: { type: String, required: true, lowercase: true },
   message: { type: String, required: true },
   requestId: { type: String, required: true, lowercase: true, trim: true },
   userId: { type: String, required: true },
   eventType: { type: String, required: true },
   serviceName: { type: String, required: true }, 
   details: { type: Object, required: false },
}, {
   versionKey: false,
   timestamps: true,
});

// Create Log model
const Log = mongoose.model<ILog>('Log', logSchema);

export default Log;