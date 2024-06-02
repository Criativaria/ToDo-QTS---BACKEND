import { Router } from "express";
import { taskController } from "../controllers/task/task-controllers";


const taskRoute = Router();


taskRoute.post('/', taskController.createTask)
taskRoute.put('/:taskId', taskController.deleteTask)

export { taskRoute }