import amqp from "amqplib";
import dotenv from "dotenv";
import { handlers } from "./handlers";

dotenv.config();

export async function startMessageConsumer() {
   // Create a connection to the RabbitMQ server
   const connection = await amqp.connect(process.env.RMQ_URL!);

   // Create a channel on the connection
   const channel = await connection.createChannel();
   await channel.assertQueue("logs_queue", { durable: true });

   console.log("📥 Waiting for messages in logs_queue...");

   // Consume messages from the queue
   channel.consume("logs_queue", async (msg) => {
      if (msg !== null) {
         try {
            const { type, data } = JSON.parse(msg.content.toString());

            if (handlers[type]) {
               await handlers[type](data);

            } else {
               console.warn("⚠️ Not handler for the message type:", type);
            }

            // Acknowledge the message
            channel.ack(msg);

         } catch (error) {
            console.error("❌ Error processing the message:", error);
            
            // Acknowledge the message
            channel.nack(msg);
         }
      }
   });
}
