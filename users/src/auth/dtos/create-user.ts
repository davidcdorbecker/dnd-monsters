import {IsEmail, IsString} from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    readonly email: string

    @IsString()
    readonly password: string

    @IsString()
    readonly name: string
}