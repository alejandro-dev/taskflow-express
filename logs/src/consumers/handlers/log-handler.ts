import { LogsController } from "../../controllers/logs-controller";
import { LogsRepository } from "../../repository/logs-repository";
import { LogsService } from "../../service/logs-service";

// Instances of the classes
const logsRepository = new LogsRepository();
const logsService = new LogsService(logsRepository);
const logsController = new LogsController(logsService);

export const handleLog = async (data: any) => {
   try {
      // Call the controller method to add the log
      logsController.addLog(data);

   } catch (error) {
      console.log('Error handling log:', error);
      throw error;
   }
   
};
