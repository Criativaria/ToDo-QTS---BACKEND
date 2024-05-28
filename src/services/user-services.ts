import { JsonObject } from "@prisma/client/runtime/library";
import { UserRepository } from "../repositories/user-repository";
import { WebError } from "../errors/web-error";
import { AuthService } from "./AuthService";
import { checkPassword, hashPassword } from "../utils/bcrypt";


export class userService {

    public static async createUser(nickname: string, senha: string, nome: string) {

        if (!nickname || !senha || !nome) {
            throw new WebError(400, "informações invalidas");
        }
        const senhaCriptografada = await hashPassword(senha)
        const info = await UserRepository.createUser(nickname, senhaCriptografada, nome)

        return info;

    }

    public static async getUserById(userId: string) {

        if (!userId) {
            throw new WebError(400, "o id do usuário não é valido");
        }
        const user = await UserRepository.getUserById(userId)
        if (user === null) {
            throw new WebError(404, "esse usuário não existe");
        }
        return user
    }

    public static async login(nickname: string, senha: string) {
        if (!nickname || !senha) {
            throw new WebError(400, "informações invalidas");
        }
        const user = await UserRepository.findUserByNickname(nickname)

        if (!user) {
            throw new WebError(404, "os dados informados não estão corretos");
        }

        if (! await checkPassword(senha, user.senha)) {
            throw new WebError(404, "os dados informados não estão corretos");
        }

        const token = AuthService.genToken({ id: user.id })
        console.log(token)
        return { token }
    }

}