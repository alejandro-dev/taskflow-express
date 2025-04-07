import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Hability to file .env
dotenv.config();

// Create a new instance of Sequelize
const sequelize = new Sequelize('postgresql://postgres:example@tasks-db:5432/tasks?schema=public');

export default sequelize; 