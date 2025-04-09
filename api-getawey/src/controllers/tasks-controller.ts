import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LogsService } from "../services/logs-service";
import { TasksService } from "../services/tasks-service";
import { convertGrpcErrorToHttp } from '../utils/errorHandler';
import { QueuesEnum } from '../enums/queues-enums'; 

export class TasksController {
   private tasksService = new TasksService();
   private logsService = new LogsService();

   constructor(tasksService: TasksService, logsService: LogsService) {
      this.tasksService = tasksService;
      this.logsService = logsService;
   } 

   /**
    * @route POST /tasks
    * 
    * 
    * @description Create a new task
    * 
    * @param {Request} req - Request object
    * @param {string} req.body.title - Title of the task
    * @param {string} req.body.description - Description of the task "Optional"
    * @param {string} req.body.assignedUserId - Assigned user id of the task "Optional"
    * @param {string} req.body.dueDate - Due date of the task (YYYY-MM-DD) "Optional"
    * @param {string} req.body.priority - Priority of the task "Optional"
    * @param {Response} res - Response object
    * 
    * @returns {Promise<void>} A promise that resolves when the user login is successful.
    * 
    */
   createTask = async (req: Request, res: Response): Promise<void> => {
      try {
         // Generate a new request id
         const requestId = uuidv4();

         // Add authorId to the request
         req.body.authorId = req.user.id;

         // Request logs microservice to log the event
         this.logsService.logInfo(QueuesEnum.LOGS, requestId, 'api-getawey', req.user.id, 'task.create', 'Task data request received', req.body);

         // Create new request to auth microservice
         const request = { ...req.body, requestId }

         // Call the login service
         const response = await this.tasksService.createTask(request);
         res.json(response);

      } catch (error: any) {
         console.error("Error creating task", error);
         // If the error has a code, we map it to an HTTP code
         if (error.code) return convertGrpcErrorToHttp(error, res); 

         // If there is no specific code, we send an internal error
         res.status(500).json({ status: 'error', message: "Internal server error" });
      }
   }
}