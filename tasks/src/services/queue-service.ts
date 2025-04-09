import amqp from "amqplib";

export class QueueService {
   sendMessage = async(queue: string, message: any) => {
      const connection = await amqp.connect(process.env.RMQ_URL!);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`📩 Mensaje enviado a la cola ${queue}:`, message);
      setTimeout(() => connection.close(), 500);
   }
}