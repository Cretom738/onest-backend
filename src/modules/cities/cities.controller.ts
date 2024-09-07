import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CityDto } from 'src/modules/cities/dtos/city.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { CreateCityDto } from 'src/modules/cities/dtos/create-city.dto';
import { UpdateCityDto } from 'src/modules/cities/dtos/update-city.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { City, ERole } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { PaginatedRequestDto } from 'src/libs/dtos/paginated-request.dto';

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
    @UseGuards(RolesGuard)
    @Roles([ERole.ADMIN])
    async createCity(@Param('regionId', ParseIntPipe) regionId: number, @Body() data: CreateCityDto): Promise<CityDto> {

        let city: City = await this.service.createCity(regionId, data);

        return new CityDto(city);
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
    async findCitiesByRegionId(@Param('regionId', ParseIntPipe) regionId: number, @Query() filterData: PaginatedRequestDto): Promise<CityDto[]> {

        let cities: City[] = await this.service.findCitiesByRegionId(regionId, filterData);

        return cities.map(c => new CityDto(c));
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
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findCityById(@Param('cityId', ParseIntPipe) cityId: number): Promise<CityDto> {

        let city: City = await this.service.findCityById(cityId);

        return new CityDto(city);
    }
  
    @Patch(':cityId')
    @ApiOkResponse({
        description: 'Update city by id',
        type: CityDto
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
    @UseGuards(RolesGuard)
    @Roles([ERole.ADMIN])
    async updateCity(@Param('regionId', ParseIntPipe) regionId: number, @Param('cityId', ParseIntPipe) cityId: number, @Body() data: UpdateCityDto): Promise<CityDto> {

        let city: City = await this.service.updateCity(regionId, cityId, data);

        return new CityDto(city);
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
    async deleteCity(@Param('cityId', ParseIntPipe) cityId: number): Promise<void> {

        await this.service.deleteCity(cityId);
    }
}
