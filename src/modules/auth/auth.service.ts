import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './auth';
import { AuthDto } from 'src/modules/auth/dtos/auth.dto';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { IRefresh } from 'src/libs/interfaces/refresh.interface';
import { AuthSuccessDto } from 'src/modules/auth/dtos/auth-success.dto';
import { UsersService } from '../users/users.service';
import { ArgonService } from 'src/libs/services/argon.service';
import { InternalJwtService } from '../internal-jwt/internal-jwt.service';
import { randomInt } from 'crypto';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { EJwtTokenTypes } from 'src/libs/types/type';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly argon: ArgonService,
        private readonly jwt: InternalJwtService,
        private readonly sessionsService: SessionsService
    ) {}

    async register({ email, fullName, password }: CreateUserDto): Promise<AuthSuccessDto> {

        const hashedPassword: string = await this.argon.hash(password);

        const { id, roles, profileId } = await this.usersService.createUser({
            email,
            fullName,
            password: hashedPassword,
        });

        const deviceId = randomInt(999999);

        const { accessToken, refreshToken, accessTokenId } = await this.jwt.generateTokenPairs({ userId: id, roles, profileId }, deviceId);

        await this.sessionsService.createSession({  
            userId: id,
            deviceId,
            refreshToken,
            accessTokenId
        });

        return {
            accessToken,
            refreshToken
        }
    }

    async login({ email, password }: AuthDto): Promise<AuthSuccessDto> {

        const { id, roles, hashedPassword, profileId } = await this.usersService.findUserByEmail(email);

        const isPasswordValid = await this.argon.compare(password, hashedPassword);

        if (!isPasswordValid) {
            
            throw new UnauthorizedException('auth.invalid.credentials');
        }

        const deviceId = randomInt(999999);

        const { accessToken, refreshToken, accessTokenId } = await this.jwt.generateTokenPairs({ userId: id, roles, profileId }, deviceId);
        
        await this.sessionsService.createSession({  
            userId: id,
            deviceId,
            refreshToken,
            accessTokenId
        });

        return {
            accessToken,
            refreshToken
        }
    }

    async logout(deviceId: number): Promise<void> {

        await this.sessionsService.deleteSession(deviceId);
    }

    async refresh(incomingRefreshToken: string): Promise<AuthSuccessDto> {

        const { isTokenValid, payload } = await this.jwt.verifyToken(incomingRefreshToken, EJwtTokenTypes.REFRESH_TOKEN);
        
        if (!isTokenValid) {
            throw new UnauthorizedException('auth.session.expired.or.invalid.token');
        }

        const { refreshToken, accessToken, accessTokenId } = await this.jwt.generateTokenPairs({ userId: payload.userId, roles: payload.roles, profileId: payload.profileId }, payload.deviceId);

        await this.sessionsService.updateSession({ userId: payload.userId, deviceId: payload.deviceId, refreshToken, accessTokenId }, payload.accessTokenId);

        return {
            refreshToken,
            accessToken
        }
    }
}
