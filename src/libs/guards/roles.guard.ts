import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { ERole } from "@prisma/client";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.get(Roles, context.getHandler());
        
        const request = context.switchToHttp().getRequest();

        if (!request['isUserAuthenticated']) {

            throw new UnauthorizedException('not.authenticated');
        }

        const userInfo: IJwtPayload = request['userInfo'];

        if (!userInfo) return false;

        const userRoles = userInfo.roles;

        if (!userRoles || userRoles.length === 0) return false;

        return roles.some(r => userRoles.includes(r));
    }
}