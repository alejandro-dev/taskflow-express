import express from "express";
import { TasksService } from "../services/tasks-service";
import { LogsService } from "../services/logs-service";
import { TasksController } from "../controllers/tasks-controller";
import { validateCreateTask } from "../validators/tasks/createTaskValidator";

const router = express.Router();

// Instance of the services
const tasksService = new TasksService();
const logsService = new LogsService();

// Create controller instance
const tasksController = new TasksController(tasksService, logsService);

/**
 * @route POST /tasks
 * @group Tasks
 * @description Create a new task
 * @param {string} title.params - Title of the task
 * @param {string} description.params - Description of the task "Optional"
 * @param {string} assignedUserId.params - Assigned user id of the task "Optional"
 * @param {string} dueDate.params - Due date of the task (YYYY-MM-DD) "Optional"
 * @param {string} priority.params - Priority of the task "Optional"
 * @returns {object} 200 - Task created successfully
 * @returns {Error} 400 - Bad Request. The data is invalid
 * @returns {Error} 500 - Error while creating the task
 */
router.post('/', validateCreateTask, tasksController.createTask);

export default router;