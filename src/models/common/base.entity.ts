import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(1)'})
    createdAt: Date

    @CreateDateColumn({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(1)', onUpdate: 'CURRENT_TIMESTAMP(1)'})
    updatedAt: Date
}