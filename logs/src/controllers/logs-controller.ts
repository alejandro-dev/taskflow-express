import { LogsService } from "../service/logs-service";
import { ILog } from "../types/ILog";

export class LogsController {
   private logsService: LogsService;

   constructor(logsService: LogsService) {
      this.logsService = logsService;
   }

   async addLog(data: ILog) {
      try {
         console.log("🔑 Procesando log:", data);
         await this.logsService.addLog(data);
         console.log("✅ Log guardado");

      } catch (error) {
         console.log('Error controller adding log:', error);
         throw error;
      }
      
   }
}