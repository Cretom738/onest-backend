import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { UsersService } from './users.service';
import { ProfileDto } from 'src/libs/dtos/profile.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { SuccessDto } from 'src/libs/dtos/success-dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { NotFoundError } from 'rxjs';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { UpdateProfileDto } from 'src/libs/dtos/update-profile.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Get('profile')
    @ApiOkResponse({
        description: 'Get user profile',
        type: ProfileDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unathorized',
        type: CommonErrorDto
    })
    async getUserProfile(@UserInfo() { userId }: IJwtPayload): Promise<ProfileDto> {

        return this.service.getUserProfile(userId);
    }

    @Patch('profile') 
    @ApiOkResponse({
        description: 'Update user profile',
        type: ProfileDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unathorized',
        type: CommonErrorDto
    })
    async updateUserProfile(@UserInfo() { userId }: IJwtPayload, @Body() data: UpdateProfileDto): Promise<SuccessDto> {

        await this.service.updateUserProfile(userId, data);

        return new SuccessDto();
    }
}
