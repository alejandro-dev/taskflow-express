import * as grpc from "@grpc/grpc-js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as protoLoader from "@grpc/proto-loader";
import { ITaskProto } from "../types/ITaskProto";

// Get the user proto file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = __dirname + "/../protos/task.proto";

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { 
   keepCase: true,
   longs: String, 
   enums: String,
   oneofs: true,
});
const userProtoGrpc: any = grpc.loadPackageDefinition(packageDefinition);

// Convert to IUsITaskProtoerProto next to do secure conversion
const taskProto = userProtoGrpc as ITaskProto;

export default taskProto;
