import {TransactionsService} from "./transactions.service";
import {Test, TestingModule} from "@nestjs/testing";
import {HttpService} from "@nestjs/axios";
import {createMock} from "@golevelup/ts-jest";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Transaction} from "./transaction.entity";
import {UserMonsters} from "../users/user_monsters.entity";
import {UsersService} from "../users/users.service";
import {Connection} from "typeorm";

describe('only for testing CI', () => {
    let service : TransactionsService
    let connection : Connection
    const mockConnection = () => ({
        transaction: jest.fn()
    })

    beforeEach(async() => {
        const module : TestingModule = await Test.createTestingModule({
            providers: [
                TransactionsService,
                {
                    provide: HttpService,
                    useValue: createMock<HttpService>()
                },
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: {}
                },
                {
                    provide: getRepositoryToken(UserMonsters),
                    useValue: {}
                },
                {
                    provide: UsersService,
                    useValue: {}
                },
                {
                    provide: Connection,
                    useFactory: mockConnection
                }
            ]
        }).compile()

        service = module.get<TransactionsService>(TransactionsService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
})