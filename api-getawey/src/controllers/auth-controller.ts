import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { convertGrpcErrorToHttp } from "../utils/errorHandler";
import { AuthService } from "../services/auth-service";
import { LogsService } from "../services/logs-service";
import { QueuesEnum } from "../enums/queues-enums";

export class AuthController {
   private authService: AuthService;
   private logsService: LogsService;

   constructor(authService: AuthService, logsService: LogsService) {
      this.authService = authService;
      this.logsService = logsService;
   }

   /**
    * @route POST /register
    * 
    * @description Register a new user
    * 
    * @param {Request} req - Request object
    * @param {string} req.body.email - Email of the user
    * @param {string} req.body.name - Name of the user
    * @param {string} req.body.password - Password of the user
    * @param {string} req.body.confirm_password - Confirm password of the user
    * @param {Response} res - Response object
    * 
    * @returns {Promise<void>} A promise that resolves when the user registration is successful.
    * 
    */
   register = async (req: Request, res: Response): Promise<void> => {
      try {
         // Extract email from request body
         const { email } = req.body;

         // Generate a new request id
         const requestId = uuidv4();

         // Delete password and confirm_password from request body
         const logRequest = { ...req.body, password: undefined, confirm_password: undefined };

         // Request logs microservice to log the event
         this.logsService.logInfo(QueuesEnum.LOGS, requestId, 'api-getawey', email, 'auth.crete', 'Create user request received', logRequest);

         // Create new request to auth microservice
         const request = { ...req.body, requestId }

         // Call the login service
         const response = await this.authService.register(request);
         res.json(response);

      } catch (error: any) {
         // If the error has a code, we map it to an HTTP code
         if (error.code) return convertGrpcErrorToHttp(error, res); 

         // If there is no specific code, we send an internal error
         res.status(500).json({ status: 'error', message: "Internal server error" });
      }
   }

   /**
    * @route POST /login
    * 
    * @description Login a user
    * 
    * @param {Request} req - Request object
    * @param {string} req.body.email - Email of the user
    * @param {string} req.body.password - Password of the user
    * @param {Response} res - Response object
    * 
    * @returns {Promise<void>} A promise that resolves when the user login is successful.
    * 
    */
   login = async (req: Request, res: Response): Promise<void> => {
      try {
         // Extract email from request body
         const { email } = req.body;

         // Generate a new request id
         const requestId = uuidv4();

         // Request logs microservice to log the event
         this.logsService.logInfo(QueuesEnum.LOGS, requestId, 'api-getawey', email, 'auth.login', 'Login user request received', { email });

         // Create new request to auth microservice
         const request = { ...req.body, requestId }

         // Call the login service
         const response = await this.authService.login(request);
         res.json(response);

      } catch (error: any) {
         // If the error has a code, we map it to an HTTP code
         if (error.code) return convertGrpcErrorToHttp(error, res); 

         // If there is no specific code, we send an internal error
         res.status(500).json({ status: 'error', message: "Internal server error" });
      }
   }

   /**
    * 
    * @router GET /auth/verify-account/{token}
    * 
    * @description Verify the account of the user
    * 
    * @param req - Request object
    * @param req.params.token - Token to verify the account
    * @param res - Response object
    * 
    * @return {Promise<void>} A promise that resolves when the user is verified.
    *
    */
   verifyAccount = async (req: Request, res: Response): Promise<void> => {
      try {
         // Extract email from request params
         const { token } = req.params;

         // Generate a new request id
         const requestId = uuidv4();

         // Request logs microservice to log the event
         this.logsService.logInfo(QueuesEnum.LOGS, requestId, 'api-getawey', token, 'auth.verify-account', 'Verify account request received', { token });

         // Create new request to auth microservice
         const request = { token, requestId }

         // Call the login service
         const response = await this.authService.verifyAccount(request);
         res.json(response);

      } catch (error: any) {
         console.log(error);
         // If the error has a code, we map it to an HTTP code
         if (error.code) return convertGrpcErrorToHttp(error, res); 

         // If there is no specific code, we send an internal error
         res.status(500).json({ status: 'error', message: "Internal server error" });
         
      }
   }
}