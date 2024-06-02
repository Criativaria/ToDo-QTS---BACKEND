import { UserRepository } from "../repositories/user-repository";
import { WebError } from "../errors/web-error";
import { AuthService } from "./AuthService";
import { checkPassword, hashPassword } from "../utils/bcrypt";
import { CreateUserRequestDto } from "../controllers/user/dto/create-user-request-dto";


export class userService {

    public static async createUser(createUser: CreateUserRequestDto) {
        const { nickname, nome, senha } = createUser

        const nicknameExists = await UserRepository.findUserByNickname(createUser.nickname)

        if (nicknameExists) {
            throw new WebError(409, "esse nickname já existe");
        }
        const senhaCriptografada = await hashPassword(senha)
        const user = await UserRepository.createUser(nickname, senhaCriptografada, nome)
        return user;
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

        if (!await checkPassword(senha, user.senha)) {
            throw new WebError(404, "os dados informados não estão corretos");
        }

        const token = AuthService.genToken({ id: user.id })
        return { token }
    }

}