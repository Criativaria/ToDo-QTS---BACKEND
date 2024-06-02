import { Request, Response } from "express";
import { userService } from "../../services/user-services";
import { CreateUserRequestDto } from "./dto/create-user-request-dto";
import { validateObject } from "../../utils/validate";

export class UserControler {

    public static async createUser(request: Request, response: Response) {
        const createUserDto = await validateObject(CreateUserRequestDto, request.body)
        const user = await userService.createUser(createUserDto)
        response.json(user)
    }

    public static async getUser(request: Request, response: Response) {
        const userId = request.params.id
        const user = await userService.getUserById(userId)
        response.json(user)
    }

    public static async login(request: Request, response: Response) {

        const nickname = request.body.nickname
        const senha = request.body.senha

        const { token } = await userService.login(nickname, senha)

        response.cookie("session", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 dias
        })
        response.status(204).end()
    }

    public static async getAuthUser(request: Request, response: Response) {
        return response.json(request.user)
    }

}