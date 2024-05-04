import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './auth';
import { AuthDto } from 'src/libs/dtos/auth.dto';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import { IRefresh } from 'src/libs/interfaces/refresh.interface';
import { AuthSuccessDto } from 'src/libs/services/auth-success.dto';
import { UsersService } from '../users/users.service';
import { ArgonService } from 'src/libs/services/argon/argon.service';
import { InternalJwtService } from '../internal-jwt/internal-jwt.service';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly argon: ArgonService,
        private readonly jwt: InternalJwtService
    ) {}

    async register({ email, fullName, password }: CreateUserDto): Promise<AuthSuccessDto> {
        const hashedPassword: string = await this.argon.hash(password);
        const { id, roles } = await this.usersService.createUser({
            email,
            fullName,
            password: hashedPassword,
        });
        const deviceId = randomInt(999999);
        const { accessToken, refreshToken, accessTokenId } = await this.jwt.generateTokenPairs({ userId: id, roles }, deviceId);
        return {
            accessToken,
            refreshToken
        }
    }

    async login({ email, password }: AuthDto): Promise<AuthSuccessDto> {
        const { id, roles, hashedPassword } = await this.usersService.findUserByEmail(email);
        const isPasswordValid = await this.argon.compare(password, hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('auth.invalid_credentials');
        }
        const deviceId = randomInt(999999);
        const { accessToken, refreshToken, accessTokenId } = await this.jwt.generateTokenPairs({ userId: id, roles }, deviceId);
        return {
            accessToken,
            refreshToken
        }
    }

    async logout(deviceId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async refresh(data: IRefresh): Promise<AuthSuccessDto> {
        throw new Error('Method not implemented.');
    }
}
