import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { CreateRoleDto } from "src/DTOs/roles/create-role.dto";
import { RoleService } from "src/services/role.service";

@Controller("/role")
export class RoleController{
    constructor(@Inject() private roleService: RoleService){}
    
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRole(@Body() request: CreateRoleDto){
        return await this.roleService.createRole(request);
    }

    @Get()
    async getAllRoles(){
        return await this.roleService.getAllRoles();
    }

    @Get(":id")
    async getRoleDetails(@Param('id', ParseUUIDPipe) id: string){
        return await this.roleService.getRoleDetails(id);
    }
}