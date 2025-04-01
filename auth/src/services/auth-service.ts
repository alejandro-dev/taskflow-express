import * as grpc from "@grpc/grpc-js";
import amqp from "amqplib";
import { v4 as uuidv4 } from 'uuid';
import { IUserProto } from "../types/IUserProto";
import { UserRepository } from "../repository/user-repository";
import { GrpcError } from "../utils/GrpcError";
import { generateJWT } from "../utils/GenerateAccessToken";
import { LogsService } from "./logs-service";
import { QueuesEnum } from "../enums/queues-enums";
import { QueueService } from "./queue-service";
import { NotificationService } from "./notifications-service";

export class AuthService {    
   private userRepository: UserRepository;
   private logsService: LogsService;
   private notificationsService: NotificationService;
   private connection: amqp.ChannelModel | null = null;
   private channel: amqp.Channel | null = null;

   constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
      this.logsService = new LogsService(new QueueService());
      this.notificationsService = new NotificationService(new QueueService());
   }

   async initRabbitMQ() {
      this.connection = await amqp.connect(process.env.RMQ_URL!);
      this.channel = await this.connection.createChannel();
   }

   /**
    * @description Register a new user
    * 
    * @param {IUserProto["user"]["CreateUserRequest"]} userData - User data to register
    * @param {string} userData.email - Email of the user
    * @param {string} userData.name - Name of the user
    * @param {string} userData.password - Password of the user
    * @param {string} userData.confirm_password - Confirm password of the user
    *
    * @returns {Promise<Object>} A promise that resolves with the user registration response.
    */     
   registerUserService = async (userData: IUserProto["user"]["CreateUserRequest"]): Promise<object> => {
      try {
         //Extract email from userData
         const { email, name, requestId } = userData;

         // Check if user already exists
         const existUser = await this.userRepository.findUserByEmail(email);
         if(existUser) throw new GrpcError("User already exists", grpc.status.ALREADY_EXISTS);
         
         // Save user data
         const user = await this.userRepository.createUser(userData);

         // Generate the url with the token
         const customUrl = `${process.env.FRONTEND_URL}/auth/verify-account/${user!.token}`;

         // Send email to notifications microservice
         this.notificationsService.sendNotification(QueuesEnum.NOTIFICATIONS, { to: user!.email, subject: 'Verificación de cuenta', replacements: {url: customUrl} });

         // Log send email user
         this.logsService.sendLogs(QueuesEnum.LOGS, requestId || uuidv4(), 'auth', user!._id.toString(), 'auth.create', 'Send email confirmation', { email });

         // Log user created
         this.logsService.sendLogs(QueuesEnum.LOGS, requestId || uuidv4(), 'auth', user!._id.toString(), 'auth.create', 'User created', { email});

         return { status: 'success', message: 'Register user success. A confirmation email has been sent to you', token: user!.token, user: user };

      } catch (error: any) {
         throw error;
      }
   }

   /**
    * @description Login a user
    * 
    * @param {IUserProto["user"]["LoginRequest"]} userData - User data to login
    * @param {string} userData.email - Email of the user
    * @param {string} userData.password - Password of the user
    * 
    * @returns {Promise<Object>} A promise that resolves with the user login response.
    */
   loginService = async (userData: IUserProto["user"]["LoginRequest"]): Promise<object> => {
      try {
         //Extract email and password from request
         const { email, password, requestId } = userData;

         // Check if user already exists
         const user = await this.userRepository.findUserByEmail(email);
         if(!user) throw new GrpcError("Email or password incorrect", grpc.status.NOT_FOUND);

         // Check if the password is correct
         const isMatch = user.comparePassword(password);
         if(!isMatch) throw new GrpcError("Email or password incorrect", grpc.status.NOT_FOUND);

         // Check if user is active
         if(!user.active) throw new GrpcError("User is not active", grpc.status.UNAUTHENTICATED);

         // Generate token for user
         const token = generateJWT({
            email: user.email,
            id: user._id,
            role_id: user.role
         });

         // Log user loged
         this.logsService.sendLogs(QueuesEnum.LOGS, requestId || uuidv4(), 'auth', user._id.toString(), 'auth.login', 'User logged');

         return { status: 'success', message: 'User logged', token, user };

      } catch (error: any) {
         throw error;
      }
   }

   /**
    * 
    * @description - Verify account
    * 
    * @param {Object} userData - User data to verify account
    * @param {string} userData.token - Token to verify account
    * @param {string} userData.requestId - Request id
    *
    * @returns {Promise<Object>} A promise that resolves with the user verification response.
    */
   verifyAccountService = async (userData: IUserProto["user"]["VerifyAccountRequest"]): Promise<object> => {
      try {
         //Extract email and password from request
         const { token, requestId } = userData;

         // Check if user already exists
         const user = await this.userRepository.findUserByToken(token);
         if(!user) throw new GrpcError("Token incorrect", grpc.status.NOT_FOUND);

         // Update user data
         await this.userRepository.activateAccount(user._id);

         // Log user loged
         this.logsService.sendLogs(QueuesEnum.LOGS, requestId || uuidv4(), 'auth', user._id.toString(), 'auth.verify-account', 'User verified');

         return { status: 'success', message: 'User verified', user };

      } catch (error: any) {
         throw error;
      }
   }
}