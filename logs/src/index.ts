import dotenv from "dotenv";
import mongoose from "mongoose";
import { startMessageConsumer } from "./consumers/message-consumer";

// Load environment variables
dotenv.config();

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || '', {});

// Start the RabbitMQ consumer
startMessageConsumer().catch(console.error);