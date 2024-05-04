import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import { AuthSuccessDto } from 'src/libs/services/auth-success.dto';
import { AuthDto } from 'src/libs/dtos/auth.dto';

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
}
