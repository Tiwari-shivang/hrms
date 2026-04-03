import { IsEmail, IsString, IsUUID } from "class-validator"

export class CreateUser{
    @IsString()
    first_name: string
    @IsString()
    last_name: string
    @IsEmail()
    email: string
    @IsString()
    password: string
    @IsUUID()
    role_id: string
}

export class LoginRequest{
    @IsEmail()
    email: string
    @IsString()
    password: string
}