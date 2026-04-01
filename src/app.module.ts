import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/users/user.entity";
import { Role } from "./models/users/role.entity";
import { Leave } from "./models/users/leaves.entity";
import { RoleService } from "./services/role.service";
import { RoleController } from "./controller/roles.controller";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            host: 'localhost',
            type: 'postgres',
            username: 'postgres',
            database: 'user_db',
            password: 'abc123#',
            port: 5432,
            synchronize: true,
            logging: true,
            entities: [Role, User, Leave],
        }),
        TypeOrmModule.forFeature([Role, User, Leave])
    ],
    providers: [RoleService],
    controllers: [RoleController]
})
export class AppModule{}