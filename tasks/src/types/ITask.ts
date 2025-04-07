/**
 * 
 * @description Task Interface
 *
 */

export interface ITask {
   title: string;
   description?: string;
   authorId: string;
   assignedUserId?: string;
   dueDate?: string;
   status: string;
   priority: string;
}