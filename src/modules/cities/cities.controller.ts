import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { CityDto } from 'src/libs/dtos/city.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { CreateCityDto } from 'src/libs/dtos/create-city.dto';
import { UpdateCityDto } from 'src/libs/dtos/update-city.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { ERole } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';

@Controller('regions/:regionId/cities')
@ApiTags('Cities')
@ApiBearerAuth('Authorization')
export class CitiesController {
    
    constructor(private readonly service: CitiesService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Create new city',
        type: CityDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
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
    @UseGuards(RolesGuard)
    @Roles([ERole.ADMIN])
    async createCity(@Param('regionId', ParseIntPipe) regionId: number, @Body() data: CreateCityDto): Promise<CityDto> {

        return this.service.createCity(regionId, data);
    }
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of cities',
        type: CityDto,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    async findCitiesByRegionId(@Param('regionId', ParseIntPipe) regionId: number): Promise<CityDto[]> {

        return this.service.findCitiesByRegionId(regionId);
    }
  
    @Get(':cityId')
    @ApiOkResponse({
        description: 'Get city by id',
        type: CityDto
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findCityById(@Param('regionId', ParseIntPipe) regionId: number, @Param('cityId', ParseIntPipe) cityId: number): Promise<CityDto> {

        return this.service.findCityById(cityId);
    }
  
    @Patch(':cityId')
    @ApiOkResponse({
        description: 'Update city by id',
        type: CityDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
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
    @UseGuards(RolesGuard)
    @Roles([ERole.ADMIN])
    async updateCity(@Param('regionId', ParseIntPipe) regionId: number, @Param('cityId', ParseIntPipe) cityId: number, @Body() data: UpdateCityDto): Promise<CityDto> {

        return this.service.updateCity(regionId, cityId, data);
    }
  
    @Delete(':cityId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete city by id'
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
    @UseGuards(RolesGuard)
    @Roles([ERole.ADMIN])
    async deleteCity(@Param('regionId', ParseIntPipe) regionId: number, @Param('cityId', ParseIntPipe) cityId: number): Promise<void> {

        await this.service.deleteCity(cityId);
    }
}
