import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {MonstersModule} from './monsters/monsters.module';
import {AppService} from "./app.service";
import {APP_INTERCEPTOR} from "@nestjs/core";
import * as redisStore from 'cache-manager-redis-store';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MonstersModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/monsters-db`
            })
        }),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            ttl: 60
        }),
        ConfigModule.forRoot({isGlobal: true})
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor
    }],
})
export class AppModule {
}
