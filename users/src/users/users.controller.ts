import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {InjectCreditsDTO} from "../transactions/dtos/inject_credits";

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

    @MessagePattern('inject-credits')
    // @UsePipes(new ValidationPipe())
    async injectCredits(@Payload() message: InjectCreditsDTO) {
        const {credits} = message
        try {
            await this.userService.injectCreditsToAll(credits)
            console.log(`injected ${credits} credits to all users`)
        } catch (e) {
            console.error(`inject ${credits} credits failed | error:${e}`)
        }
    }
}
