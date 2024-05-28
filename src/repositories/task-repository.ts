import { prisma } from "../prisma";


export class TaskRepository {

    public static async getTaskById(taskId: string) {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })
        return task
    }

    public static async createTask(userId: string, text: string) {
        const task = await prisma.task.create({
            data: {
                text: text,
                userId: userId
            }
        })

        return task
    }

    public static async deleteTask(userId: string, taskId: string) {
        const task = await prisma.task.delete({
            where: {
                userId: userId,
                id: taskId
            }
        })
        return task
    }
}