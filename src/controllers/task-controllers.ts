import { Request, Response } from "express";
import { taskService } from "../services/task-service";


export class taskController {

    public static async createTask(request: Request, response: Response) {
        const userId = request.user.id
        const text = request.body.text

        const info = await taskService.createTask(userId, text)
        response.json(info)
    }

    public static async deleteTask(request: Request, response: Response) {
        const userId = request.user.id
        const taskId = request.params.taskId

        const info = await taskService.deleteTask(userId, taskId)
        response.json(info)
    }

}