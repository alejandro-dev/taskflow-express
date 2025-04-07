import { TasksRepository } from "../repository/tasks-repository";
import { ITaskProto } from "../types/ITaskProto";

export class TasksService {
   private tasksRepository: TasksRepository;

   constructor(tasksRepository: TasksRepository) {
      this.tasksRepository = tasksRepository;
   }

   createTaskService(taskData: ITaskProto["task"]["CreateTaskRequest"]): any {
      try {
         taskData = { ...taskData, authorId: taskData.assignedUserId! };

         // Save task data
         this.tasksRepository.saveTask(taskData);

         return { status: 'success', message: 'Task created successfully' };

      } catch (error) {
         throw error;
      }
   }
}