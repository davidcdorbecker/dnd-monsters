import {Module} from '@nestjs/common';
import {MonstersService} from './monsters.service';
import {MonstersController} from './monsters.controller';
import {HttpModule} from '@nestjs/axios';
import {MongooseModule} from "@nestjs/mongoose";
import {MonsterSchema} from "./monster.schema";
import {MONSTER_MODEL} from "../constants";

@Module({
    providers: [MonstersService],
    controllers: [MonstersController],
    imports: [HttpModule, MongooseModule.forFeature([{name: MONSTER_MODEL, schema: MonsterSchema}])],
})
export class MonstersModule {
}
