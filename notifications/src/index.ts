import dotenv from "dotenv";
import { startMessageConsumer } from "./consumers/message-consumer";

// Load environment variables
dotenv.config();

// Start the RabbitMQ consumer
startMessageConsumer().catch(console.error);