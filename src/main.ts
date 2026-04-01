import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function server() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }))
    await app.listen(8080);
    console.log('application running on 8080');
}

server();