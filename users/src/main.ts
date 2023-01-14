import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`]
      }
    }
  })

  await app.listen(8002)
  await app.startAllMicroservices()
}
bootstrap();
