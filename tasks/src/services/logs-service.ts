import { QueueService } from "./queue-service";
import { QueuesEnum } from "../enums/queues-enums";

export class LogsService {
   private queueService: QueueService;

   constructor(queueService: QueueService) {
      this.queueService = queueService;
   }

   /**
    * 
    * @param type - The type of the log
    * @param requestId - The request id
    * @param serviceName - The name of the service
    * @param user_id - The user id
    * @param eventType - The event type
    * @param message - Message to log
    * @param details - Any data from user. Is optional
    */
   async sendLogs(type: string, requestId: string, serviceName: string, user_id: string, eventType: string, message: string, details?: any) {
      // If contains message, send error logs
      if(details) {
         if(typeof details.code === 'number' && details.code >= 13) this.logError(type, requestId, serviceName, user_id, eventType, details);
         else this.logInfo(type, requestId, serviceName, user_id, eventType, message || details.message, details);

      }else{
         // Send info logs
         this.logInfo(type, requestId, serviceName, user_id, eventType, message || details || '', details);
      }
   }

   /**
    * 
    * @param {string} type - The type of the log
    * @param {string} requestId - The request id
    * @param {string} serviceName - The name of the service
    * @param {string} user_id - The user id or any data from user
    * @param {string} eventType - The event type
    * @param {any} error - The error
    * @description Log an error event
    */
   async logError(type: string, requestId: string, serviceName: string, user_id: string, eventType: string, error: any) {
      const logData = {
         type,
         data: {
            level: 'ERROR',
            message: error.message || 'Un error ocurrió',
            requestId, 
            userId: user_id,
            eventType: eventType,
            serviceName: serviceName,
            details: error
         }
      };

      // Send de logs to logs microservice
      this.queueService.sendMessage(QueuesEnum.LOGS, logData);
   }

   /**
    * 
    * @param {string} type - The type of the log
    * @param {string} requestId - The request id
    * @param {string} serviceName - The name of the service
    * @param {string} user_id - The user id
    * @param {string} eventType - The event type
    * @param {string} message - Message to log
    * @param {string} details - Any data from user. Is optional
    */
   async logInfo(type: string, requestId: string, serviceName: string, user_id: string, eventType: string, message: string, details?: any) {
      // Send de logs to logs microservice
      const logData = {
         type,
         data: {
            level: 'INFO',
            message: message,
            requestId, 
            userId: user_id,
            eventType: eventType,
            serviceName: serviceName,
            details
         }
      };

      // Send de logs to logs microservice
      this.queueService.sendMessage(QueuesEnum.LOGS, logData);
   }
}