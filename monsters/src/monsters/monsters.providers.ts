import {Connection} from "mongoose";
import {MonsterSchema} from "./monster.schema";
import {DATABASE_CONNECTION, MONSTER_MODEL} from "../constants";

export const monstersProviders = [
    {
        provide: MONSTER_MODEL,
        useFactory: (connection: Connection) => connection.model('Monster', MonsterSchema),
        inject: [DATABASE_CONNECTION]
    }
]