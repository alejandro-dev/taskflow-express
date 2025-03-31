import { handleLog } from "./log-handler";

export const handlers: Record<string, (data: any) => Promise<void>> = {
   'logs_queue': handleLog,
};
