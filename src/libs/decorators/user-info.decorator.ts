import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

export const UserInfo = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IJwtPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request['userInfo'];
    },
);