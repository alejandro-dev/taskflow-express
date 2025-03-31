import dotenv from "dotenv";
import mongoose from "mongoose";
import "./server"; // Importa y ejecuta el servidor

// Hability to file .env
dotenv.config();

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || '', {});

// Escuchar eventos de conexión
mongoose.connection.on('connected', () => {
   console.log('Conexión a MongoDB establecida');
});

mongoose.connection.on('error', (err) => {
   console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
   console.log('Desconectado de MongoDB');
});