import { ERole } from '.prisma/client';
import { EJwtTokenTypes } from '../types/type';

export interface IJwtPayload {

    deviceId?: number;

    userId: number;

    accessTokenId?: number;

    roles: ERole[];

    type?: EJwtTokenTypes;
}