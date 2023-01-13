import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UsersService} from "./users.service";
import {LocalStrategy} from "./local.auth";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [AuthService, UsersService, LocalStrategy],
    imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({
        secret: 'secretKey',
        signOptions: {expiresIn: '60s'},
    })]
})
export class UsersModule {
}
