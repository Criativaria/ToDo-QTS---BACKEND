import { Request, Response } from "express";
import { userService } from "../services/user-services";


export class UserControler {

    public static async createUser(request: Request, response: Response) {
        const nickname = request.body.nickname
        const senha = request.body.senha
        const nome = request.body.name
        const info = await userService.createUser(nickname, senha, nome)
        response.json(info)
    }

    public static async getUser(request: Request, response: Response) {
        const userId = request.params.id
        const user = await userService.getUserById(userId)
        response.json(user)
    }

    public static async login(request: Request, response: Response) {
        const nickname = request.body.nickname
        const senha = request.body.senha

        const info = await userService.login(nickname, senha)
        response.json(info)
    }

    public static async getAuthUser(request: Request, response: Response) {
        return response.json(request.user)
    }

}