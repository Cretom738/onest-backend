import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { CreateAdDto } from './dtos/create-ad.dto';
import { AdDto } from './dtos/ad.dto';
import { Ad } from '@prisma/client';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';

@Controller('ads')
@ApiTags('Ads')
@ApiBearerAuth('Authorization')
export class AdsController {

    constructor(private readonly service: AdsService) {}

    @Post()
    @ApiOkResponse({
        description: 'create new ad',
        type: AdDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async createAd(@UserInfo() { profileId }: IJwtPayload, @Body() data: CreateAdDto): Promise<AdDto> {

        const ad: Ad = await this.service.createAd(profileId, data);

        return new AdDto(ad);
    }
}
