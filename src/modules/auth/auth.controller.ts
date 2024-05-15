import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import { AuthSuccessDto } from 'src/libs/dtos/auth-success.dto';
import { AuthDto } from 'src/libs/dtos/auth.dto';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { AuthGuard } from 'src/libs/guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @Post('register')
    async register(@Body() data: CreateUserDto): Promise<AuthSuccessDto> {
        return this.service.register(data);
    }

    @Post('login')
    async login(@Body() data: AuthDto): Promise<AuthSuccessDto> {
        return this.service.login(data);
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    async logout(@UserInfo() { deviceId }: IJwtPayload) {
        await this.service.logout(deviceId);
        return {
            success: true
        };
    }
    
    /*
    @Post('refresh')
    async refresh(@Body data:)
    */
}
