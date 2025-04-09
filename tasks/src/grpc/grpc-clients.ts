import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PROTO_PATHS } from "../enums/proto-enums";

// Hability to file .env
dotenv.config();

// Get the user proto file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      process.env.AUTH_GRPC_URL,
      grpc.credentials.createInsecure() 
   ),
};

export default grpcClients;
