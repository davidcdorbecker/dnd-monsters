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

    async findById(id: number) {
        return this.userRepo.findOne({relations: ['monsters'], where: {id}})
    }
}
