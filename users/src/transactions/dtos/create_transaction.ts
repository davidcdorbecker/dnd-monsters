import {IsNumber} from "class-validator";

export class CreateTransactionDTO {
    @IsNumber()
    readonly egg_level: number
}