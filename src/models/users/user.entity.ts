import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { Role } from "./role.entity";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

@Entity('users')
export class User extends BaseEntity {
    @Column({ name: 'first_name' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @Column({ name: 'last_name' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @Column({ name: 'email', unique: true})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Column({name: 'password'})
    password: string;

    @JoinColumn({ name: 'role_id' })
    @ManyToOne(() => Role)
    role: Role;
}