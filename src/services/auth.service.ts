import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser, LoginRequest } from "src/DTOs/user/create-user.dto";
import { User } from "src/models/users/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "src/models/users/role.entity";
import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { SuccessResponse } from "src/DTOs/common.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        @Inject() private readonly jwtService: JwtService) { }
    async signup(request: CreateUser, response: Response): Promise<SuccessResponse> {
        const hashedPassword = await bcrypt.hash(request.password, 10);
        const role = await this.roleRepo.findOne({ where: { id: request.role_id } })
        if (!role) {
            console.error("provided role dosen't exist!");
            throw new BadRequestException("Provided role dosen't exist!");
        }
        const existingUser = await this.userRepo.findOne({ where: { email: request.email } });
        if (existingUser) {
            throw new ConflictException("User with this email already exist!");
        }
        request.password = await bcrypt.hash(request.password, 10);
        const newUser = this.userRepo.create(request);
        const createdUser = await this.userRepo.save(newUser);
        const token_payload = {
            "sub": createdUser.email,
            "id": createdUser.id
        }
        const token = this.jwtService.sign(token_payload, {
            expiresIn: '1h'
        })
        response.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        const signupResponse: SuccessResponse = {
            message: 'User created successfully',
            route: '/auth/signup',
            status: 201
        }
        return signupResponse;
    }

    async login(request: LoginRequest, response: Response): Promise<SuccessResponse>{
        const user = await this.userRepo.findOne({where: {email: request.email}});
        if(!user){
            throw new NotAcceptableException(`User with email: ${request.email} doesn't exist`);
        }
        console.log(user.password, request.password)
        const isCorrectPassword = await bcrypt.compare(request.password, user.password)
        if(!isCorrectPassword){
            throw new UnauthorizedException("Incorrect password provided");
        }
        const tokenPayload = {
            "sub": user.email,
            "id": user.id
        }
        const token = this.jwtService.sign(tokenPayload, {
            expiresIn: '1h'
        })
        response.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        const loginResponse: SuccessResponse = {
            message: 'Loggedin successfully',
            route: '/auth/login',
            status: 200
        }
        return loginResponse;
    }
}