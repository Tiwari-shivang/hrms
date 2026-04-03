import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { CreateUser, LoginRequest } from "src/DTOs/user/create-user.dto";
import { AuthService } from "src/services/auth.service";

@Controller("/auth")
export class AuthController{
    constructor(@Inject() private readonly authService: AuthService){}
    @Post("/signup")
    async signUp(@Body() request: CreateUser, @Res({passthrough: true}) response: any){
        return await this.authService.signup(request, response);
    }

    @Post("/login")
    async login(@Body() request: LoginRequest, @Res({passthrough: true}) response: any){
        return await this.authService.login(request, response);
    }
}