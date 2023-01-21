import {Body, Controller, Get, Param, Post, Req, Session, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
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
        return await this.transactionsService.create(id, body.egg_level)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/byUserId/:userId')
    async getTransactionByUserId(@Param('userId') userId : number) {
        return await this.transactionsService.findByUserId(userId)
    }

    @Get('/pending')
    async getPendingTransactions() {
        return await this.transactionsService.getPendingTransactions()
    }

    @MessagePattern('finalize-transaction')
    // @UsePipes(new ValidationPipe())
    async readMessage(@Payload() message: ProcessTransactionDTO) {
        const {transaction_id, monster_id} = message
        try {
            await this.transactionsService.process(transaction_id, monster_id)
            console.log(`transaction ${transaction_id} successfully processed `)
        } catch (e) {
            console.error(`transaction ${transaction_id} failed | error:${e}`)
        }
    }
}
