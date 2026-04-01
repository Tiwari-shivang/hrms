import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { IsString } from "class-validator";
import { User } from "./user.entity";

@Entity('leaves')
export class Leave extends BaseEntity{

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User;

    @Column({name: 'from_date'})
    fromDate: Date;

    @Column({name: 'to_date'})
    toDate: Date

    @Column({name: 'status'})
    @IsString()
    status: string

    @Column({name: 'reason'})
    @IsString()
    reason: string

}