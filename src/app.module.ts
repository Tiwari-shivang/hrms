import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/users/user.entity";
import { Role } from "./models/users/role.entity";
import { Leave } from "./models/users/leaves.entity";
import { RoleService } from "./services/role.service";
import { RoleController } from "./controller/roles.controller";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { GuardService } from "./services/guard.service";
import { UserService } from "./services/user.service";
import { UserController } from "./controller/user.controller";
import { LeaveService } from "./services/leave.service";
import { LeaveController } from "./controller/leave.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

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
        TypeOrmModule.forFeature([Role, User, Leave]),
        JwtModule.register({
            secret: 'my-secret-key-long-enough'
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            playground: true,
            sortSchema: true
        })
    ],
    providers: [RoleService, AuthService, GuardService, UserService, LeaveService],
    controllers: [RoleController, AuthController, UserController, LeaveController]
})
export class AppModule{}