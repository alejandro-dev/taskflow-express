import { QueueService } from "./queue-service";
import { QueuesEnum } from "../enums/queues-enums";

export class NotificationService {
   private queueService: QueueService;

   constructor(queueService: QueueService) {
      this.queueService = queueService;
   }

   async sendNotification(type: string, data: any) {
      try {
         const message = { type, data };
         // Send email to notifications microservice
         this.queueService.sendMessage(QueuesEnum.NOTIFICATIONS, message);

      } catch (error) {
         console.log('Error handling log:', error);
      }
   }
}