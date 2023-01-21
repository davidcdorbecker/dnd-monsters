import {BadRequestException, Injectable, NotAcceptableException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) {
    }

    async signup(email: string, password: string, name: string) {
        if (await this.checkUser(email)) {
            throw new BadRequestException('email in use')
        }

        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        await this.usersService.create(email, hashedPassword, name)
        return this.login(email)
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async checkUser(email: string)/*: Promise<boolean>*/ {
        const user = await this.usersService.findByEmail(email)
        return !!user
    }

    async login(email: string) {
        const {id} = await this.usersService.findByEmail(email)
        return {
            access_token: this.jwtService.sign({
                id,
                email
            }),
        };
    }
}
