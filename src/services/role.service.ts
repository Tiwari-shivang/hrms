import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "src/DTOs/roles/create-role.dto";
import { Role } from "src/models/users/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService{
    constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>){}
    
    async createRole(request: CreateRoleDto): Promise<Role>{
        const exist = await this.roleRepo.findOne({where: {name: request.name}});
        if(exist){
            throw new ConflictException(`Role with name: ${request.name} already exists`);
        }
        const role = this.roleRepo.create(request);
        try{
            return await this.roleRepo.save(role);
        }
        catch(e){
            console.log(e);
            throw new InternalServerErrorException("Failed to create role");
        }
    }

    async getAllRoles(): Promise<Role[]>{
        return await this.roleRepo.find({select: ['id', 'name']});
    }

    async getRoleDetails(id: string): Promise<Role | null> {
        return await this.roleRepo.findOne({where: {id: id}});
    }
}