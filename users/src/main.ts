import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        broker: ['localhost:9092']
      }
    }
  })

  await app.listen(8002)
  await app.startAllMicroservices()
}
bootstrap();
