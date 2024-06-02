import { IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserRequestDto {
    @IsString()
    @Length(4, 12)
    public nickname!: string;

    @IsStrongPassword({
        minLength: 4,
        minLowercase: 1,
        minNumbers: 1
    })
    public senha!: string;

    @IsString()
    @Length(3, 30)
    public nome!: string;
}