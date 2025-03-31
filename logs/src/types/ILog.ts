import mongoose from "mongoose";

/**
 * 
 * @description User Interface
 *
 */
export interface ILog {
   _id: mongoose.Types.ObjectId;
   level: string;
   message: string;
   requestId: string;
   userId: string;
   eventType: string;
   serviceName: string;
   details?: string;
}