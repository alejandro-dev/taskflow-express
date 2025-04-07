import express from "express";
import dotenv from "dotenv";
import { AuthRoutes, TasksRoutes } from "./routes";

const app = express();

// Hability to file .env
dotenv.config();

// Hability to receive JSON
app.use(express.json());

// Add the apiRouter to the app
app.use('/auth', AuthRoutes);
app.use('/tasks', TasksRoutes);


export default app;
