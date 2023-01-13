import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./transaction.entity";
import {UsersService} from "../auth/users.service";
import {UsersModule} from "../auth/users.module";
import {UserMonsters} from "../auth/user_monsters.entity";

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [TypeOrmModule.forFeature([Transaction, UserMonsters]), UsersModule],
  exports: [TransactionsService]
})
export class TransactionsModule {}
