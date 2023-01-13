import {IsNumber} from "class-validator";

export class CreateTransactionDTO {
    @IsNumber()
    readonly credits : number

    @IsNumber()
    readonly egg_level: number
}