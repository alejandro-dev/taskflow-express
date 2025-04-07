import Tasks from "../models/Tasks";
import { ITaskProto } from "../types/ITaskProto";

export class TasksRepository {
   async saveTask(task: ITaskProto["task"]["CreateTaskRequest"]): Promise<any> {
      try {
         console.log('task', task);
         // Save task data
         return await Tasks.create({
            title: task.title,
            description: task.description || null,
            authorId: task.authorId,
            assignedUserId: task.assignedUserId || null,
            dueDate: task.dueDate || null,
            status: task.status || 'pending',
            priority: task.priority || 'medium',
         });

      } catch (error) {
         throw error;
      }
   }
}