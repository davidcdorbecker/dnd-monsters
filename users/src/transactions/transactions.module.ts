import {Module} from '@nestjs/common';
import {TransactionsController} from './transactions.controller';
import {TransactionsService} from './transactions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transaction} from "./transaction.entity";
import {AuthModule} from "../auth/auth.module";
import {UserMonsters} from "../users/user_monsters.entity";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {HttpModule} from "@nestjs/axios";

@Module({
    controllers: [TransactionsController],
    providers: [TransactionsService, UsersService],
    imports: [TypeOrmModule.forFeature([Transaction, UserMonsters, User]), AuthModule, HttpModule],
    exports: [TransactionsService]
})
export class TransactionsModule {
}
