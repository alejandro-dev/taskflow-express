import Log from "../models/Log";
import { ILog } from "../types/ILog";

export class LogsRepository {
   /**
    * 
    * @description Create a log
    * 
    * @param {ILog} data - Log data
    * @param {string} data.level - Log level
    * @param {string} data.message - Log message
    * @param {string} data.requestId - Request ID
    * @param {string} data.userId - User ID
    * @param {string} data.eventType - Event type
    * @param {string} data.serviceName - Service name
    * @param {string} data.details - Details
    * 
    * @returns {Promise<void>} A promise that resolves when the log is created.
    */
   async createLog(data: ILog): Promise<void> {
      try { 
         // Create a new log
         await Log.create(data);

      } catch (error: any) {
         console.log('Error repository adding log:', error);
         throw error;
      }
   }
}