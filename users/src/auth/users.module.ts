import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UsersService} from "./users.service";
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {jwtConstants} from "../constants";
import {ConfigService} from "@nestjs/config";
import {UserMonsters} from "./user_monsters.entity";

@Module({
    controllers: [UsersController],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([User, UserMonsters]),
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get(jwtConstants.secret),
                signOptions: {expiresIn: '1h'},
            })
        })
    ],
    exports: [AuthService, UsersService]
})
export class UsersModule {
}