import dotenv from "dotenv";
import sequelize from "./config/sequelize";
import "./server"; // Import the server file
import './models/Tasks'; // Import the model file

// Hability to file .env
dotenv.config();

// Connect to the database
try{ 
   // Verify the connection to the database
   await sequelize.authenticate();
   console.log('Conexión correcta a la base de datos');

   // Synchronize the models with the database
   await sequelize.sync();
   console.log("Sincronización de tablas completada");
   
}catch(error){
   console.log(error);
   console.error("Error al conectar con la base de datos:", error);
}