import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { AddLeaveRequest } from "src/DTOs/leave/create-leave.dto";
import { Leave } from "src/models/users/leaves.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { User } from "src/models/users/user.entity";

@Injectable()
export class LeaveService {
    constructor(@InjectRepository(Leave) private readonly leaveRepo: Repository<Leave>, @InjectRepository(User) private readonly userRepo: Repository<User>) { }
    async getAllLeaves(request: any) {
        console.log(request.user);
        const user = await this.userRepo.findOne({ where: { id: request.user.id } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return await this.leaveRepo.find({ where: { user: user } });
    }

    async addLeave(leaveRequest: AddLeaveRequest, request: any) {
        console.log(request.user);
        const user = await this.userRepo.findOne({ where: { id: request.user.id } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        console.log(leaveRequest)
        const leave: Leave = this.leaveRepo.create({
            user: user,
            fromDate: leaveRequest.from_date,
            toDate: leaveRequest.to_date,
            reason: leaveRequest.reason,
            status: 'pending'
        });
        try{
            console.log(leave)
            return await this.leaveRepo.save(leave);
        }
        catch(e){
            throw new InternalServerErrorException("Error in adding leave")
        }
    }
}