import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {APP_PIPE} from "@nestjs/core";
import {User} from "./users/user.entity";
import {AuthModule} from "./auth/auth.module";
import {TransactionsModule} from './transactions/transactions.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Transaction} from "./transactions/transaction.entity";
import {UserMonsters} from "./users/user_monsters.entity";
import {UsersModule} from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: 5432,
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                entities: [User, Transaction, UserMonsters],
                synchronize: true
            })
        }),
        UsersModule,
        AuthModule,
        TransactionsModule,
        ConfigModule.forRoot({isGlobal: true})
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
