import { Router } from "express";
import { taskController } from "../controllers/task-controllers";


const taskRoute = Router();


taskRoute.post('/', taskController.createTask)
taskRoute.delete('/:taskId', taskController.deleteTask)

export { taskRoute }