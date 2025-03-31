import { handleVerificationEmail } from "./notification-handler";

export const handlers: Record<string, (data: any) => Promise<void>> = {
   'notifications_queue': handleVerificationEmail,
};
