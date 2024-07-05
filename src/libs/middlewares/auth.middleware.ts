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
                req['isUserAuthenticated'] = false;
                return next();
            }
            const bearer: string[] = authorization.split(' ');
            if (bearer.length < 2) {
                req['isUserAuthenticated'] = false;
                return next();
            }
            const token: string = bearer[1];
            const { isTokenValid, payload } = await this.jwt.verifyToken(token, EJwtTokenTypes.ACCESS_TOKEN);
            if (!isTokenValid) {
                req['isUserAuthenticated'] = false;
                return next();
            }
            req['isUserAuthenticated'] = true;
            req['userInfo'] = payload;
        } catch (error) {
            this.logger.error(error.message);
            req['isUserAuthenticated'] = false;
        }
        return next();
    }
}