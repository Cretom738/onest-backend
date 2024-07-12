import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { ERole } from "@prisma/client";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly allowedRoles: ERole[]) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const userInfo: IJwtPayload = request['userInfo'];

        return this.allowedRoles.every(r => userInfo.roles.includes(r));
    }
}