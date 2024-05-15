import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ISessionsService } from './sessions';
import { ISession } from 'src/libs/interfaces/session.interface';
import { PrismaService } from 'src/libs/services/prisma/prisma.service';
import { Session } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ArgonService } from 'src/libs/services/argon/argon.service';
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SessionsService implements ISessionsService {

    private readonly logger: Logger = new Logger(SessionsService.name); 

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly argon: ArgonService
    ) {}

    async createSession({ userId, deviceId, refreshToken, accessTokenId }: ISession): Promise<void> {
        const userSessions: Session[] = await this.prisma.session.findMany({
            where: {
                userId
            }
        });

        if (userSessions.length >= parseInt(this.configService.get('USER_SESSION_LIMIT'))) {

            await this.deleteSession(userSessions[0].deviceId);

            this.logger.log(`Session limit reached, older session deleted for user ${userId}`);
        }

        await this.createNewSession({ userId, deviceId, refreshToken, accessTokenId });

        this.logger.log(`New session created for user ${userId}`);
    }

    async updateSession({ userId, deviceId, refreshToken, accessTokenId }: ISession, oldAccessTokenId: number): Promise<void> {
        //TODO: Add black list token
        const hashedRefreshToken: string = await this.argon.hash(refreshToken);

        const { accessExpiredAt, refreshExpiredAt } = this.getExpirationDatePairs();
        
        let session: { id: number };
        try {
            session = await this.prisma.session.update({
                where: {
                    deviceId
                },
                data: {
                    refreshToken: hashedRefreshToken,
                    expiredAt: refreshExpiredAt
                },
                select: {
                    id: true
                }
            });
        } catch (error: any) {
            this.logger.error(error.message);

            if (error instanceof PrismaClientKnownRequestError
                && error.code === 'P2025') {
                    
                throw new UnauthorizedException('auth.session.expired.or.invalid.refresh.token');
            }
        }

        this.logger.log(`Session updated for device ${deviceId}`);

        await this.prisma.sessionAccessToken.upsert({
            where: {
                sessionId: session.id
            },
            update: {
                accessTokenId,
                expiredAt: accessExpiredAt
            },
            create: {
                accessTokenId,
                sessionId: session.id,
                expiredAt: accessExpiredAt
            }
        });
        
        this.logger.log(`New access token created for device ${deviceId}`);
    }

    async deleteSession(deviceId: number): Promise<void> {
        await this.prisma.session.delete({
            where: {
                deviceId
            }
        });
        //TODO: Add black list token
    }

    private async createNewSession({ userId, deviceId, refreshToken, accessTokenId }: ISession): Promise<void> {
        const hashedRefreshToken: string = await this.argon.hash(refreshToken);

        const { accessExpiredAt, refreshExpiredAt } = this.getExpirationDatePairs();

        await this.prisma.session.create({
            data: {
                userId,
                deviceId,
                refreshToken: hashedRefreshToken,
                expiredAt: refreshExpiredAt,
                sessionAccessToken: {
                    create: {
                        accessTokenId,
                        expiredAt: accessExpiredAt
                    }
                }
            }
        });
    }

    private getExpirationDatePairs(): { accessExpiredAt: Date, refreshExpiredAt: Date } {
        const currentTime: Date = new Date();

        const accessExpiredAt: Date = new Date(currentTime.getTime() + this.configService.get('ACCESS_TOKEN_LIFE_TIME') * 1000);

        const refreshExpiredAt: Date = new Date(currentTime.getTime() + this.configService.get('REFRESH_TOKEN_LIFE_TIME') * 1000);

        return {
            accessExpiredAt,
            refreshExpiredAt
        }
    }
}
