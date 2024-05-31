import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user-repository";
import { AuthService } from "../services/AuthService";
import { WebError } from "../errors/web-error";

type TokenPayLoad = { id: string }

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    const token = request.cookies.session;

    if (!token) {
        throw new WebError(401, "você precisa estar logado para poder acessar esta rota");
    }

    const { isValid, payload } = AuthService.validateToken<TokenPayLoad>(token!)

    if (!isValid || !payload) {
        throw new WebError(401, "token de autenticação invalido");
    }

    const user = await UserRepository.getUserById(payload.id)

    if (!user) {
        throw new WebError(401, "token de autenticação invalido");
    } else {
        request.user = user;
        next()
    }
}   