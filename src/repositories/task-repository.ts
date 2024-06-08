import { prisma } from "../prisma";


export class TaskRepository {

    public static async getTask(userId: string) {
        const tasks = await prisma.task.findMany({
            where: {
                done: false,
                userId: userId
            }
        })
        return tasks;
    }

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
        const task = await prisma.task.update({
            data: {
                done: true
            },
            where: {
                userId: userId,
                id: taskId
            }
        })
        return task
    }
}