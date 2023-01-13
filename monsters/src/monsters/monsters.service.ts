import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom,} from "rxjs";
import {AxiosError} from "axios";
import {Model, Types} from "mongoose";
import {Monster} from "./interfaces/monster.interface";

const monstersAPI = 'https://www.dnd5eapi.co'

@Injectable()
export class MonstersService {
    constructor(
        private readonly httpService: HttpService,
        @Inject('MONSTER_MODEL')
        private monsterModel: Model<Monster>
    ) {
    }

    async getFromAPI(): Promise<Monster[]> {
        const {data: monstersData} = await firstValueFrom(this.httpService.get(`${monstersAPI}/api/monsters`).pipe(
            catchError((error: AxiosError) => {
                throw new InternalServerErrorException(error);
            }),)
        )

        const monstersURL = monstersData.results.map(monster => firstValueFrom(this.httpService.get(`${monstersAPI}${monster.url}`).pipe(
            catchError((error: AxiosError) => {
                throw new InternalServerErrorException(error);
            }))))

        const data = await Promise.allSettled(monstersURL)
        return data
            .filter((x): x is PromiseFulfilledResult<Partial<{ data: Object }>> => x.status === "fulfilled")
            .map(x => new this.monsterModel(x.value.data))
    }

    async replace(monsters: Monster[]) {
        await this.monsterModel.deleteMany({})
        this.monsterModel.bulkSave(monsters)
    }

    findOne(objectId: Types.ObjectId) {
        return this.monsterModel.findById(objectId)
    }

    minMaxChallengeRating() {
        return this.monsterModel.aggregate([
            {
                '$group': {
                    "_id": null,
                    "max": {"$max": "$challenge_rating"},
                    "min": {"$min": "$challenge_rating"}
                }
            }
        ])
    }
}
