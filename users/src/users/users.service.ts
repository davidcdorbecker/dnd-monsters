import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {UserMonsters} from "./user_monsters.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {
    }

    create(email: string, password: string, name: string) {
        const initialCredits = 200
        const user = this.userRepo.create({email, password, name, credits: initialCredits})
        return this.userRepo.save(user)
    }

    findByEmail(email: string) {
        return this.userRepo.findOne({where: {email}})
    }

    findById(id: number) {
        return this.userRepo.findOne({relations: ['monsters'], where: {id}})
    }

    async injectCreditsToAll(credits: number) {
        const users = (await this.userRepo.find()).map(user => ({...user, credits: user.credits += credits})).map(user => this.userRepo.save(user))
        return Promise.allSettled(users)
    }
}
