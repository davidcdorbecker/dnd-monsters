import {Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./transaction.entity";
import {Connection, ConnectionManager, getConnectionManager, Repository} from "typeorm";
import {UserMonsters} from "../users/user_monsters.entity";
import {User} from "../users/user.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class TransactionsService {
    private connectionManager: ConnectionManager

    constructor(
        @InjectRepository(Transaction) private transactionsRepo: Repository<Transaction>,
        @InjectRepository(UserMonsters) private userMonstersRepo: Repository<UserMonsters>,
        @Inject(UsersService) private UserService: UsersService,
        private connection: Connection
    ) {
        this.connectionManager = getConnectionManager()
    }

    create(user_id: number, egg_level: number, credits: number) {
        const user = new User()
        user.id = user_id
        const transaction = this.transactionsRepo.create({
            user,
            egg_level,
            credits,
            status: 'PENDING'
        })
        return this.transactionsRepo.save(transaction)
    }

    async process(transaction_id: number, monster_id: string) {
        console.log('success')
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.startTransaction()

        try {
            const transaction = await queryRunner.manager.getRepository(Transaction).findOne({
                where: {id: transaction_id},
                relations: {user: true}
            })

            if (!transaction) {
                console.error('transaction not found')
                return
            }
            transaction.status = 'BORN'
            await queryRunner.manager.getRepository(Transaction).save(transaction)

            const userMonster = this.userMonstersRepo.create({
                monster_id,
                user: transaction.user
            })
            await queryRunner.manager.getRepository(UserMonsters).save(userMonster)
            await queryRunner.commitTransaction()
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new InternalServerErrorException(e)
        } finally {
            await queryRunner.release()
        }

    }
}
