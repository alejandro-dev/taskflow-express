import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { IUserProto } from "../types/IUserProto";

// Get the user proto file
const PROTO_PATH = __dirname + "/../protos/user.proto";

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { 
   keepCase: true,
   longs: String, 
   enums: String,
   oneofs: true,
});
const userProtoGrpc: any = grpc.loadPackageDefinition(packageDefinition);

// Convert to IUserProto next to do secure conversion
const userProto = userProtoGrpc as IUserProto;

export default userProto;
