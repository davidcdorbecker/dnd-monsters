import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {ConfigService} from "@nestjs/config";
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";

@Module({
    controllers: [AuthController],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get(`JWT_SECRET`),
                signOptions: {expiresIn: '1h'},
            })
        }),
        TypeOrmModule.forFeature([User])
    ],
    exports: [AuthService]
})
export class AuthModule {
}