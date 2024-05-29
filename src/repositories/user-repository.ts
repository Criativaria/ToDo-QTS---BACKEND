import { JsonObject } from "@prisma/client/runtime/library";
import { prisma } from "../prisma"

export class UserRepository {

    public static async createUser(nickname: string, senha: string, nome: string) {
        const newUser = await prisma.user.create({
            data: {
                name: nome,
                nickname: nickname,
                senha: senha
            }

        })
        return newUser;
    }

    public static async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    }

    public static async findUserByNickname(nickname: string) {
        const user = await prisma.user.findUnique({
            where: {
                nickname: nickname
            }
        })
        return user
    }
}