
import { NotificationController } from "../../controller/notification-controller";
import { NotificationService } from "../../services/notification-service";

// Instances of the classes
const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

export const handleVerificationEmail = async (data: any) => {
   try {
      // Call the controller method to add the log
      notificationController.sendVerificationEmail(data);

   } catch (error) {
      console.log('Error handling log:', error);
      throw error;
   }
   
};
