import { WebError } from "../errors/web-error";
import { TaskRepository } from "../repositories/task-repository";
import { UserRepository } from "../repositories/user-repository";


export class taskService {

    public static async createTask(userId: string, text: string) {

        if (!userId || !text) {
            throw new WebError(400, "informações invalidas");
        }
        const info = await TaskRepository.createTask(userId, text)
        return info
    }

    public static async deleteTask(userId: string, taskId: string) {
        if (!userId || !taskId) {
            throw new WebError(400, "informações invalidas");
        }

        const task = await TaskRepository.getTaskById(taskId)

        if (task?.userId != userId) {
            throw new WebError(403, "esse usuário não tem permissão para excluir essa task");

        }
        const info = await TaskRepository.deleteTask(userId, taskId)
        return info
    }

}