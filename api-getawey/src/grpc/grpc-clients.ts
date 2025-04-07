import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { PROTO_PATHS } from "../enums/proto-enums";

// Load package definition
const loadProto = (path: string) => {
   const packageDefinition = protoLoader.loadSync(path, { 
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
   });
   return grpc.loadPackageDefinition(packageDefinition) as any;
};

// Initialize grpc clients
const grpcClients = {
   authService: new (loadProto(__dirname + PROTO_PATHS.USER)).user.UserService(
      "auth:50051",
      grpc.credentials.createInsecure() 
   ),
   tasksService: new (loadProto(__dirname + PROTO_PATHS.TASK)).task.TaskService(
      "tasks:50052",
      grpc.credentials.createInsecure()
   ),
};

export default grpcClients;
