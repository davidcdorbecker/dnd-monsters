import {
    CACHE_MANAGER,
    CacheInterceptor, CacheKey,
    CacheTTL,
    Controller,
    Get, Inject,
    NotFoundException,
    Param,
    Post,
    UseInterceptors
} from '@nestjs/common';
import {MonstersService} from "./monsters.service";
import {Types} from "mongoose";

@UseInterceptors(CacheInterceptor)
@Controller('monsters')
export class MonstersController {
    constructor(
        private readonly monstersService: MonstersService
    ) {
    }

    @Post('/refresh')
    async refreshDB() {
        const monsters = await this.monstersService.getFromAPI()
        return this.monstersService.create(monsters)
    }


    @Get('/:id')
    async findMonster(@Param('id') id: string) {
        const monster = await this.monstersService.findOne(new Types.ObjectId(id))
        if (!monster) {
            throw new NotFoundException('monster not found')
        }
        return monster
    }
}
