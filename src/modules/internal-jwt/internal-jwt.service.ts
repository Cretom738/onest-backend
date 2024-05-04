import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomInt } from 'crypto';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';

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
            this.generateToken({ ...payload, deviceId, accessTokenId }, this.configService.get('ACCESS_TOKEN_LIFE_TIME')),
            this.generateToken({ ...payload, deviceId, accessTokenId }, this.configService.get('REFRESH_TOKEN_LIFE_TIME'))
        ])
        return {
            refreshToken,
            accessToken,
            accessTokenId
        }
    }
}
