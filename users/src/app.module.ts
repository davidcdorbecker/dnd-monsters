import {Module, ValidationPipe} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {APP_PIPE} from "@nestjs/core";
import {User} from "./auth/user.entity";
import {UsersModule} from "./auth/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            database: 'users',
            host: `${!process.env.environment ? 'localhost' : 'mysql'}`,
            port: 3306,
            username: 'root',
            password: 'secret',
            entities: [User],
            synchronize: true
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService,   {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            whitelist: true,
        }),
    },],
})
export class AppModule {
}
