import { v4 as uuidv4 } from 'uuid';
import { QueuesEnum } from "../enums/queues-enums";
import { TasksRepository } from "../repository/tasks-repository";
import { ITaskProto } from "../types/ITaskProto";
import { LogsService } from "./logs-service";
import { QueueService } from "./queue-service";
import grpcClients from "../grpc/grpc-clients";
import { GrpcError } from "../utils/GrpcError";

export class TasksService {
   private tasksRepository: TasksRepository;
   private logsService: LogsService;

   constructor(tasksRepository: TasksRepository) {
      this.tasksRepository = tasksRepository;
      this.logsService = new LogsService(new QueueService());
   }

   async createTaskService(taskData: ITaskProto["task"]["CreateTaskRequest"]): Promise<any> {
      try {

         // Check if assigned user exists
         const response = await new Promise((resolve, reject) => { 
            grpcClients.authService.ExistUser({ userId: taskData.assignedUserId }, (error: GrpcError, response: any) => {
               // if containt error reject the promise
               if (error) reject(error);
               resolve(response);
            });
         });

         console.log('response', response)

         // Save task data
         this.tasksRepository.saveTask(taskData);

         const { requestId, ...taskInfo } = taskData;

         // Log task created
         this.logsService.sendLogs(QueuesEnum.LOGS, taskData.requestId || uuidv4(), 'tasks', taskData.authorId, 'tasks.create', 'Task created', taskInfo);

         return { status: 'success', message: 'Task created successfully' };

      } catch (error) {
         throw error;
      }
   }
}