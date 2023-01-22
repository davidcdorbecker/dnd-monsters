import {IsNumber} from "class-validator";

export class InjectCreditsDTO {
    @IsNumber()
    readonly credits: number
}