import * as grpc from "@grpc/grpc-js";
import { ITaskProto } from "../types/ITaskProto";
import { TasksService } from "../services/tasks-service";

export class TasksController {
   private taskService: TasksService;
   constructor(taskService: TasksService) {
      this.taskService = taskService;
      // this.logsService = new LogsService(new QueueService());
   }

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
         // this.logsService.sendLogs(QueuesEnum.LOGS, call.request.requestId || uuidv4(), 'auth', call.request.email.toString(), 'auth.create', error.message, error);
         
         console.log(error);
         callback(error, null);
      }
   }
}