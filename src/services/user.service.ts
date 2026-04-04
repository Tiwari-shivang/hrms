import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserResponse } from "src/DTOs/user/response-user.dto";
import { User } from "src/models/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async getUserDetails(request: any){
        const user = await this.userRepo.findOne({where: {id: request.user.id}})
        if(!user){
            throw new NotFoundException("User doesn't exist");
        }
        const response: UserResponse = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        }
        return response;
    }
}