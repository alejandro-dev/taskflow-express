import { LogsRepository } from "../repository/logs-repository";
import { ILog } from "../types/ILog";

export class LogsService {
   private logsRepository: LogsRepository;

   constructor(logsRepository: LogsRepository) {
      this.logsRepository = logsRepository;
   }

   async addLog(data: ILog) {
      try {
         this.logsRepository.createLog(data);

      } catch (error) {
         console.log('Error service adding log:', error);
         throw error;
      }
   }
}