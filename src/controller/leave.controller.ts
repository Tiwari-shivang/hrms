import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { Request as request } from "express";
import { AddLeaveRequest } from "src/DTOs/leave/create-leave.dto";
import { GuardService } from "src/services/guard.service";
import { LeaveService } from "src/services/leave.service";

@Controller("/leave")
export class LeaveController{
    constructor(@Inject() private readonly leaveService: LeaveService){}
    @Get()
    @UseGuards(GuardService)
    async getAllLeaveRequests(@Req() req: Request){
        return await this.leaveService.getAllLeaves(req);
    }

    @Post()
    @UseGuards(GuardService)
    async addLeave(@Req() req: Request, @Body() leaveRequest: AddLeaveRequest){
        return await this.leaveService.addLeave(leaveRequest, req);
    }
}