import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {LoginDTO} from "./dtos/login-with-user-and-password";
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "./dtos/create-user";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    @Post('/signup')
    async signup(@Body() body: CreateUserDTO) {
        const {name, email, password} = body
        await this.authService.signup(email, password, name)
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Body() body: LoginDTO) {
        const {email} = body
        return this.authService.login(email)
    }
}

