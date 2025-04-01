import grpcClients from "../grpc/grpc-clients";

export class AuthService {
   /**
    * 
    * @description Register a new user and send data to auth microservice
    * 
    * @param params - Params to register a new user
    * @param params.email - Email of the user
    * @param params.name - Name of the user
    * @param params.password - Password of the user
    * @param params.confirm_password - Confirm password of the user
    *
    * @returns {Promise<Object>} A promise that resolves with the user registration response.
    */
   register = async (params: any): Promise<object> => {
      return new Promise((resolve, reject) => {
         grpcClients.authService.CreateUser(params, (error: GrpcError, response: any) => {
            // if containt error reject the promise
            if (error) reject(error);
            resolve(response);
         });
      });
   }

   /**
    * 
    * @description Login a user and send data to auth microservice
    * 
    * @param params - Params to login a user
    * @param params.email - Email of the user
    * @param params.password - Password of the user
    *
    * @returns {Promise<Object>} A promise that resolves with the user login response.
    */
   login = async (params: any): Promise<object> => {
      return new Promise((resolve, reject) => {
         grpcClients.authService.Login(params, (error: GrpcError, response: any) => {
            // if containt error reject the promise
            if (error) reject(error);
            resolve(response);
         });
      });
   }

   /**
    * 
    * @description Verify account
    * 
    * @param params - Params to verify the account
    * @param params.token - Token to verify the account
    * @param params.requestId - Request id
    *
    * @returns {Promise<Object>} A promise that resolves with the user verification response.
    */
   verifyAccount = async (params: any): Promise<object> => {
      return new Promise((resolve, reject) => {
         grpcClients.authService.VerifyAccount(params, (error: GrpcError, response: any) => {
            // if containt error reject the promise
            if (error) reject(error);
            resolve(response);
         });
      });
   }
}