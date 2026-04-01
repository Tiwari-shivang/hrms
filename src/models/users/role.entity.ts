import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { IsString } from "class-validator";

@Entity('roles')
export class Role extends BaseEntity {
    @Column({name: 'name'})
    @IsString()
    name: string
}