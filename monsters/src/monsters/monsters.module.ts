import {Module} from '@nestjs/common';
import {MonstersService} from './monsters.service';
import {MonstersController} from './monsters.controller';
import {HttpModule} from '@nestjs/axios';
import {monstersProviders} from "./monsters.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
    providers: [MonstersService,
        ...monstersProviders],
    controllers: [MonstersController],
    imports: [HttpModule, DatabaseModule],
})
export class MonstersModule {
}
