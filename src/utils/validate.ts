import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { WebError } from "../errors/web-error";


export async function validateObject<T>(cls: ClassConstructor<T>, payload: any): Promise<T> {

    const instance: any = plainToInstance(cls, payload) //converte o json que recebe do front e converte para uma class

    const errors = await validate(instance) // reponsavel por fazer cada uma das validações que a gente colocou no createuserRequestDTO

    if (errors.length) {
        const error = errors[0];
        //pega todos os erros que acontecerem
        const message = Object.values(error.constraints!)[0];
        throw new WebError(400, message)
    }
    return instance
}
