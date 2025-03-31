import amqp from "amqplib";
import { QueuesEnum } from "../enums/queues-enums";

export class LogsService {
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
            user_id: user_id,
            event_type: eventType,
            service_name: serviceName,
            details: {
               error: error.message ,
               stack: error.stack,
            } ,
         }
      };

      // Send de logs to logs microservice
      this.sendMessage(QueuesEnum.LOGS, logData);
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
      this.sendMessage(QueuesEnum.LOGS, logData);
   }

   sendMessage = async(queue: string, message: any) => {
      const connection = await amqp.connect(process.env.RMQ_URL!);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`📩 Mensaje enviado a la cola ${queue}:`, message);
      setTimeout(() => connection.close(), 500);
   }
}