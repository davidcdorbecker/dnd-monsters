import {Body, Controller, Post, Req, Session, UseGuards, ValidationPipe} from '@nestjs/common';
import {TransactionsService} from "./transactions.service";
import {CreateTransactionDTO} from "./dtos/create_transaction";
import {AuthGuard} from "@nestjs/passport";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ProcessTransactionDTO} from "./dtos/process_transaction";

@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly transactionsService: TransactionsService
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async doTransaction(@Req() {user}, @Body() body: CreateTransactionDTO) {
        const {id} = user
        return await this.transactionsService.create(id, body.egg_level, body.credits)
    }

    @MessagePattern('test-topic')
    async readMessage(@Payload(ValidationPipe) message: any) {
        const {transaction_id, monster_id} = message
        return await this.transactionsService.process(transaction_id, monster_id)
    }
}
