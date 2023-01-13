import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe(),
    );

    const microservice = app.connectMicroservice({
    });
    await app.startAllMicroservices()
    await app.listen(8001);
}

bootstrap();
