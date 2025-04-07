import grpcClients from "../grpc/grpc-clients";

export class TasksService {
   /**
    * 
    * @description Create a new task
    * 
    * @param {object} params - Params to create a new task
    * @param {string} params.title - Title of the task
    * @param {string} params.description - Description of the task "Optional"
    * @param {string} params.assignedUserId - Assigned user id of the task "Optional"
    * @param {string} params.dueDate - Due date of the task (YYYY-MM-DD) "Optional"
    * @param {string} params.priority - Priority of the task "Optional"
    *
    * @returns {Promise<Object>} A promise that resolves with the task creation response.
    * 
    */
   createTask = async (params: any): Promise<object> => {
      return new Promise((resolve, reject) => {
         grpcClients.tasksService.createTask(params, (error: GrpcError, response: any) => {
            // if containt error reject the promise
            if (error) {
               console.log(error);
               reject(error);
            }
            resolve(response);
         });
      });
   }
}