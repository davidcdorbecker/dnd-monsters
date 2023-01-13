import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {MonstersModule} from './monsters/monsters.module';
import {AppService} from "./app.service";
import {DatabaseModule} from './database/database.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [MonstersModule, DatabaseModule, CacheModule.register({
        isGlobal: true,
        store: redisStore,
        host: `${!process.env.environment ? 'localhost': 'redis'}`,
        port: 6379,
        ttl: 60
    })],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor
    }],
})
export class AppModule {
}
