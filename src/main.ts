import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function server() {
    const app = await NestFactory.create(AppModule);
    await app.listen(8080);
    console.log('application running on 8080');
}

server();