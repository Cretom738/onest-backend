import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { AuthSuccessDto } from 'src/modules/auth/dtos/auth-success.dto';
import { AuthDto } from 'src/modules/auth/dtos/auth.dto';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { RefreshDto } from 'src/modules/auth/dtos/refresh.dto';
import { SuccessDto } from 'src/libs/dtos/success-dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Register',
    type: AuthSuccessDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestDto,
  })
  @ApiConflictResponse({
    description: 'Conflict',
    type: CommonErrorDto,
  })
  async register(@Body() data: CreateUserDto): Promise<AuthSuccessDto> {
    return this.service.register(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Log in',
    type: AuthSuccessDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: CommonErrorDto,
  })
  async login(@Body() data: AuthDto): Promise<AuthSuccessDto> {
    return this.service.login(data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Log out',
    type: SuccessDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: CommonErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: CommonErrorDto,
  })
  @UseGuards(AuthGuard)
  async logout(@UserInfo() { deviceId }: IJwtPayload): Promise<SuccessDto> {
    await this.service.logout(deviceId);

    return new SuccessDto();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Refresh access token',
    type: AuthSuccessDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: CommonErrorDto,
  })
  async refresh(@Body() { refreshToken }: RefreshDto): Promise<AuthSuccessDto> {
    return this.service.refresh(refreshToken);
  }
}
