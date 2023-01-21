import {MonstersService} from "./monsters.service";
import {Test, TestingModule} from "@nestjs/testing";
import {HttpService} from "@nestjs/axios";
import {createMock} from "@golevelup/ts-jest";
import {getModelToken} from "@nestjs/mongoose";
import {CACHE_MANAGER} from "@nestjs/common";
import {MONSTER_MODEL} from "../constants";


describe('only for testing CI', () => {
    let service: MonstersService;
    let cache : Cache

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MonstersService,
                {
                    provide : getModelToken(MONSTER_MODEL),
                    useValue: {}
                },
                {
                    provide: HttpService,
                    useValue: createMock<HttpService>()
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: {
                        get: () => 'any'
                    }
                }
            ],
        }).compile();

        service = module.get<MonstersService>(MonstersService);
        cache = module.get(CACHE_MANAGER)
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
})