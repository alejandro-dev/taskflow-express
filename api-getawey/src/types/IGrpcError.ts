interface GrpcError extends Error {
   code: number; // Código de error de gRPC (ej. grpc.status.INVALID_ARGUMENT)
 }
 