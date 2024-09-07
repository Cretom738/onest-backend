import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { CreateAdDto } from './dtos/create-ad.dto';
import { AdDto } from './dtos/ad.dto';
import { Ad } from '@prisma/client';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { RecommendedAdsDto } from './dtos/recommended-ads.dto';
import { FilterAdDto } from './dtos/filter-ad.dto';
import { PaginatedResponseDto } from 'src/libs/dtos/paginated-response.dto';

@Controller('ads')
@ApiTags('Ads')
@ApiBearerAuth('Authorization')
export class AdsController {

    constructor(private readonly service: AdsService) {}

    @Post()
    @ApiCreatedResponse({
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
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of ads',
        type: AdDto,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
    })
    async findAllAds(@Query() filterData: FilterAdDto, @UserInfo() userData: IJwtPayload): Promise<PaginatedResponseDto<AdDto>> {

        const [ ads, count ] = await this.service.findAllAds(filterData, userData?.profileId);

        return new PaginatedResponseDto({
            result: ads.map(a => new AdDto(a)),
            count,
            offset: filterData.offset,
            limit: filterData.limit
        });
    }
  
    @Get(':id')
    @ApiOkResponse({
        description: 'Get ad by id',
        type: AdDto
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findAdById(@Param('id', ParseIntPipe) id: number): Promise<AdDto> {

        const ad: Ad = await this.service.findAdById(id);

        return new AdDto(ad);
    }
  
    @Patch(':id')
    @ApiOkResponse({
        description: 'Update ad by id',
        type: AdDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error or id validation error',
        type: BadRequestDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async updateAd(@UserInfo() { profileId }: IJwtPayload, @Param('id', ParseIntPipe) id: number, @Body() data: UpdateAdDto): Promise<AdDto> {

        const ad: Ad = await this.service.updateAd(profileId, id, data);

        return new AdDto(ad);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete ad by id'
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async deleteAd(@UserInfo() { profileId }: IJwtPayload, @Param('id', ParseIntPipe) id: number): Promise<void> {

        await this.service.deleteAd(profileId, id);
    }

    @Get(':id/recommendations')
    @ApiOkResponse({
        description: 'Get list of recommended ads',
        type: AdDto,
        isArray: true
    })
    async getRecommendedAds(@Param('id', ParseIntPipe) id: number, @Query() recommendedAdsData: RecommendedAdsDto): Promise<AdDto[]> {

        const ads: Ad[] = await this.service.getRecommendedAds(id, recommendedAdsData); 

        return ads.map(a => new AdDto(a));
    }
}
