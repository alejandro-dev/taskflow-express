import { NotificationService } from "../services/notification-service";

export class NotificationController {
   private notificationService: NotificationService;

   constructor(notificationService: NotificationService) {
      this.notificationService = notificationService;
   }

   sendVerificationEmail(data: any) {
      try {
         const { to, subject, replacements } = data;
         this.notificationService.sendEmail(to, subject, replacements, 'verify-account.html');

      } catch (error) {
         console.log('Error handling log:', error);
         
      }
   }
}