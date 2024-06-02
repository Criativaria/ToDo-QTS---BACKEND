import { IsString } from "class-validator"

export class LoginUserRequestDto {
    @IsString()
    public nickname!: string

    @IsString()
    public senha!: string

}