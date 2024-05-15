import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomInt } from 'crypto';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { EJwtTokenTypes } from 'src/libs/types/type';

@Injectable()
export class InternalJwtService {

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService
    ) {}

    async generateToken(payload: IJwtPayload, lifeTime: number): Promise<string> {
        return this.jwt.signAsync(payload, {
            expiresIn: lifeTime
        });
    }

    async generateTokenPairs(payload: IJwtPayload, deviceId: number) : Promise<any> {
        const accessTokenId = randomInt(999999);
        const [ accessToken, refreshToken ] = await Promise.all([
            this.generateToken({ ...payload, deviceId, accessTokenId, type: EJwtTokenTypes.ACCESS_TOKEN }, this.configService.get('ACCESS_TOKEN_LIFE_TIME')),
            this.generateToken({ ...payload, deviceId, accessTokenId, type: EJwtTokenTypes.REFRESH_TOKEN }, this.configService.get('REFRESH_TOKEN_LIFE_TIME'))
        ]);
        return {
            refreshToken,
            accessToken,
            accessTokenId
        };
    }

    async verifyToken(token: string, type: EJwtTokenTypes): Promise<{ isTokenValid: boolean, payload: IJwtPayload }> {
        const payload: IJwtPayload = await this.jwt.verifyAsync<IJwtPayload>(token, { ignoreExpiration: false });
        if (!payload
            || payload.type !== type) {
            return {
                isTokenValid: false,
                payload: null
            } 
        }
        //TODO: check if token is blacklisted
        return {
            isTokenValid: true,
            payload
        }
    }
}
