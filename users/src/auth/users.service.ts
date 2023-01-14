import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email: string, password: string, name: string) {
        const initialCredits = 200
        const user = this.repo.create({email, password, name, credits: initialCredits})
        return this.repo.save(user)
    }

    find(email: string) {
        return this.repo.findOne({where: {email}})
    }


}
