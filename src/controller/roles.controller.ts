import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { CreateRoleDto } from "src/DTOs/roles/create-role.dto";
import { GuardService } from "src/services/guard.service";
import { RoleService } from "src/services/role.service";

@Controller("/role")
export class RoleController {
    constructor(@Inject() private roleService: RoleService, @Inject() private readonly guardService: GuardService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(GuardService)
    async createRole(@Body() request: CreateRoleDto) {
        return await this.roleService.createRole(request);
    }

    @Get()
    @UseGuards(GuardService)
    async getAllRoles() {
        return await this.roleService.getAllRoles();
    }

    @Get(":id")
    async getRoleDetails(@Param('id', ParseUUIDPipe) id: string) {
        return await this.roleService.getRoleDetails(id);
    }
}