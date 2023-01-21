import {CACHE_MANAGER, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom,} from "rxjs";
import {AxiosError} from "axios";
import {Model, Promise, Types} from "mongoose";
import {Monster} from "./interfaces/monster.interface";
import {Cache} from 'cache-manager';
import {MONSTER_EGGS_KEY} from "../constants";

const monstersAPI = 'https://www.dnd5eapi.co'

@Injectable()
export class MonstersService {
    constructor(
        private readonly httpService: HttpService,
        @Inject('MONSTER_MODEL') private repo: Model<Monster>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
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
            .map(x => new this.repo(x.value.data))
    }

    async replace(monsters: Monster[]) {
        await this.repo.deleteMany({})
        await this.repo.bulkSave(monsters)
    }

    findOne(objectId: Types.ObjectId) {
        return this.repo.findById(objectId)
    }

    async getEggs() {
        let eggs = await this.cacheManager.get(MONSTER_EGGS_KEY)
        if (eggs !== null) {
            return eggs
        }
        const defaultNumberOfEggs = 5
        const defaultRate = 3
        const [{min: minChallengeRating, max: maxChallengeRating}] = await this.repo.aggregate([
            {
                '$group': {
                    "_id": null,
                    "max": {"$max": "$challenge_rating"},
                    "min": {"$min": "$challenge_rating"}
                }
            }
        ])
        const range = (maxChallengeRating - minChallengeRating) / defaultNumberOfEggs
        eggs = [...Array(defaultNumberOfEggs)].map((el, i, {length}) => ({
            minLevel: Math.round(i * range),
            maxLevel: i !== length - 1 ? Math.round(i * range + range - 1) : Math.round(i * range + range),
            price: Math.round((((i * range + range) + (i * range)) / 2) * defaultRate),
            level: i
        }))
        await this.cacheManager.set(MONSTER_EGGS_KEY, eggs, 60 * 60)
        return eggs
    }

    async getRandomMonstersByLevels(levels: number[]) {
        const eggs = await this.getEggs()
        const buildPipeline = (({minLevel, maxLevel}) => ([{
            "$match": {
                "challenge_rating": {
                    $gte: +minLevel,
                    $lte: +maxLevel
                }
            }
        }, {$sample: {size: 1}}]))
        const aggregates = levels.map(level => this.repo.aggregate(buildPipeline(eggs[level])))
        return (await Promise.all(aggregates)).flat()
    }
}
