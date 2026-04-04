import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { Request as request } from "express";
import { GuardService } from "src/services/guard.service";
import { UserService } from "src/services/user.service";

@Controller("/user")
export class UserController{
    constructor(@Inject() private readonly userService: UserService){}
    @Get()
    @UseGuards(GuardService)
    async getUserDetails(@Req() request: Request){
        return await this.userService.getUserDetails(request);
    }
}