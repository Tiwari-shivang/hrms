import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class GuardService implements CanActivate {
    constructor(@Inject() private readonly jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const headerCookies: string[] = request.headers.cookie.split(',');
        const cookies: any = headerCookies.reduce((acc, curr) => {
            curr.trim()
            const cookie = curr.split("=");
            const key = cookie[0];
            const val = cookie[1];
            acc[key] = val;
            return acc;
        }, {})
        try {
            const decode = this.jwtService.verify(cookies.access_token);
            request.user = decode;
            return true;
        }
        catch (e) {
            throw new UnauthorizedException("Invalid token");
        }
    }

}