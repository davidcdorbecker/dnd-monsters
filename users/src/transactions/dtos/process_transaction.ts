import {IsMongoId, IsNumber} from "class-validator";

export class ProcessTransactionDTO {
    @IsNumber()
    readonly transaction_id: number

    @IsMongoId()
    readonly monster_id: string
}