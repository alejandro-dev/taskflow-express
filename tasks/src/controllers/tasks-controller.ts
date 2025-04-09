import * as grpc from "@grpc/grpc-js";
import { v4 as uuidv4 } from 'uuid';
import { ITaskProto } from "../types/ITaskProto";
import { TasksService } from "../services/tasks-service";
import { LogsService } from "../services/logs-service";
import { QueueService } from "../services/queue-service";
import { QueuesEnum } from "../enums/queues-enums";

export class TasksController {
   private taskService: TasksService;
   private logsService: any;
   
   constructor(taskService: TasksService) {
      this.taskService = taskService;
      this.logsService = new LogsService(new QueueService());
   }

   /**
    * @description Handles the task create via gRPC.
    * 
    * @param {grpc.ServerUnaryCall<ITaskProto["task"]["CreateTaskRequest"], ITaskProto["task"]["CreateTaskResponse"]>} call - The gRPC request call containing task data.
    * @param {grpc.sendUnaryData<ITaskProto["task"]["CreateTaskResponse"]>} callback - The gRPC callback function to return a response.
    * 
    * @returns {Promise<void>} A promise that resolves when the user registration is successful.
    */
   createTask = async (
      call: grpc.ServerUnaryCall<ITaskProto["task"]["CreateTaskRequest"], ITaskProto["task"]["CreateTaskResponse"]>, 
      callback: grpc.sendUnaryData<ITaskProto["task"]["CreateTaskResponse"]>
   ): Promise<void> => {   
      try {
         // Save taks data
         const response = await this.taskService.createTaskService(call.request) as ITaskProto["task"]["CreateTaskResponse"];

         // Return response
         callback(null, response);

      } catch (error: any) {
         this.logsService.sendLogs(QueuesEnum.LOGS, call.request.requestId || uuidv4(), 'tasks', call.request.authorId, 'tasks.create', error.message, error);
         
         console.log(error);
         callback(error, null);
      }
   }
}