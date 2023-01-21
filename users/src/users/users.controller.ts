import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        @Inject(UsersService) private userService: UsersService,
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    async monsters(@Req() {user}) {
        const {id} = user
        return await this.userService.findById(id)
    }
}
