import grpcClients from "../grpc/grpc-clients";

const getUser = async (id: string) => {
   return new Promise((resolve, reject) => {
      grpcClients.authService.GetUser({ id }, (error: any, response: any) => {
         if (error) {
            console.error("Error:", error.message);
            reject(error);

         } else {
            console.log("User Data:", response);
            resolve(response);
         }
      });
   });
}

export default {
   getUser
}