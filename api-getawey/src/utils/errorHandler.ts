import { status } from "@grpc/grpc-js";
import { Response } from "express";

// Array of gRPC status codes and their corresponding HTTP status codes
const grpcToHttpStatus: Record<number, number> = {
   [status.OK]: 200,
   [status.INVALID_ARGUMENT]: 400,
   [status.UNAUTHENTICATED]: 401,
   [status.PERMISSION_DENIED]: 403,
   [status.NOT_FOUND]: 404,
   [status.ALREADY_EXISTS]: 409,
   [status.INTERNAL]: 500,
   [status.UNAVAILABLE]: 503
};

/**
 * Interface to define a gRPC error.
 */interface GrpcError extends Error {
   code?: number; // El código puede ser opcional
}

/**
 * @description Converts a gRPC error into an HTTP response.
 * 
 * @param {GrpcError} error - The gRPC error object.
 * @param {Response} res - The Express response object.
 * 
 */
const convertGrpcErrorToHttp = (error: GrpcError, res: Response): void => {
   // Map gRPC status code to HTTP status code
   const httpStatus = grpcToHttpStatus[error.code || status.INTERNAL] || 500;

   // Add status code to message
   const statusCode = httpStatus < 500 ? "fail" : "error";

   // Delete error code from message
   const cleanMessage = error.message.replace(/^\d+\s[A-Z_]+:\s/, "");

   // Send error response
   res.status(httpStatus).json({ status: statusCode, message: cleanMessage });
};

// Export the function
export { convertGrpcErrorToHttp };
