import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./transaction.entity";
import {Connection, ConnectionManager, getConnectionManager, Repository} from "typeorm";
import {UserMonsters} from "../users/user_monsters.entity";
import {User} from "../users/user.entity";
import {UsersService} from "../users/users.service";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class TransactionsService {
    private connectionManager: ConnectionManager

    constructor(
        @InjectRepository(Transaction) private transactionsRepo: Repository<Transaction>,
        @InjectRepository(UserMonsters) private userMonstersRepo: Repository<UserMonsters>,
        @Inject(UsersService) private userService: UsersService,
        private readonly httpService: HttpService,
        private connection: Connection
    ) {
        this.connectionManager = getConnectionManager()
    }

    async create(user_id: number, egg_level: number) {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.startTransaction()
        const {data: eggs} = await firstValueFrom(this.httpService.get(`http://${process.env.MONSTERS_HOST}:${process.env.MONSTERS_PORT}/monsters/eggs`))
        const user = await this.userService.findById(user_id)
        if (eggs.length - 1 < egg_level) {
            throw new BadRequestException('invalid transaction')
        }

        const credits = eggs[egg_level].price

        if (user.credits < credits) {
            throw new BadRequestException('not enough credits')
        }

        try {
            const transaction = this.transactionsRepo.create({
                user,
                egg_level,
                credits,
                status: 'PENDING'
            })
            user.credits -= credits
            await queryRunner.manager.getRepository(User).save(user)
            await queryRunner.manager.getRepository(Transaction).save(transaction)
            await queryRunner.commitTransaction()
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new InternalServerErrorException(e)
        } finally {
            await queryRunner.release()
        }
    }

    getPendingTransactions() {
        return this.transactionsRepo.manager.createQueryBuilder(Transaction, 't').where(`t.status='PENDING' AND t.created_at < NOW() - INTERVAL '1 minute'`).getMany()
    }

    findByUserId(userId: number) {
        return this.transactionsRepo.find({where: {user: {id: userId}}})
    }

    async process(transaction_id: number, monster_id: string) {
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
