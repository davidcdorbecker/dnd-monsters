import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MonstersModule } from './monsters/monsters.module';
import {AppService} from "./app.service";
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MonstersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
