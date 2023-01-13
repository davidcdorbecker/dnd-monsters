import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {APP_PIPE} from "@nestjs/core";
import {User} from "./auth/user.entity";
import {UsersModule} from "./auth/users.module";
import {TransactionsModule} from './transactions/transactions.module';
import {ConfigModule} from "@nestjs/config";
import {Transaction} from "./transactions/transaction.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {UserMonsters} from "./auth/user_monsters.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            database: 'users',
            host: `${!process.env.environment ? 'localhost' : 'mysql'}`,
            port: 3306,
            username: 'root',
            password: 'secret',
            entities: [User, Transaction, UserMonsters],
            synchronize: true
        }),
        UsersModule,
        TransactionsModule,
        ConfigModule.forRoot({isGlobal: true}),
        ClientsModule.register([
            {
                name: 'KAFKA_CONSUMER',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092']
                    }
                }
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            whitelist: true,
        }),
    },],
})
export class AppModule {
}
