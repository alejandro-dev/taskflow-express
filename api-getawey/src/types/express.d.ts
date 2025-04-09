import { IUser } from '../models/User';  // Asegúrate de que esta ruta sea correcta

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role: string;
            }
        }
    }
}