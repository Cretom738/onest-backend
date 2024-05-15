import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { InternalJwtService } from "src/modules/internal-jwt/internal-jwt.service";
import { EJwtTokenTypes } from "../types/type";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    private readonly logger: Logger = new Logger(AuthMiddleware.name); 

    constructor(
        private readonly jwt: InternalJwtService
    ) {}

    async use(req: any, res: any, next: (error?: any) => void) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                req['isUserAthenticated'] = false;
            }
            const bearer: string[] = authorization.split(' ');
            if (bearer.length < 2) {
                req['isUserAthenticated'] = false;
            }
            const token: string = bearer[1];
            const { isTokenValid, payload } = await this.jwt.verifyToken(token, EJwtTokenTypes.ACCESS_TOKEN);
            if (!isTokenValid) {
                req['isUserAthenticated'] = false;
            }
            req['isUserAthenticated'] = true;
            req['userInfo'] = payload;
        } catch (error) {
            this.logger.error(error.message);
            req['isUserAthenticated'] = false;
        }
        return next();
    }
}