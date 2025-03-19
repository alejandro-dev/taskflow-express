// Clase personalizada para manejar errores de gRPC
export class GrpcError extends Error {
   code: number;  // Propiedad 'code' que contiene el código de error gRPC

   constructor(message: string, code: number) {
      super(message);
      this.code = code;
      this.name = this.constructor.name;  // Establecer el nombre del error a la clase actual (GrpcError)
      Error.captureStackTrace(this, this.constructor);  // Captura la traza de la pila
   }
}
