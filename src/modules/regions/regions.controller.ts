import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { RegionsService } from './regions.service';
import { RegionDto } from 'src/libs/dtos/region.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CreateRegionDto } from 'src/libs/dtos/create-region.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { UpdateRegionDto } from 'src/libs/dtos/update-region.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { ERole } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';

@Controller('regions')
@ApiTags('Regions')
@ApiBearerAuth('Authorization')
export class RegionsController {
    
    constructor(private readonly service: RegionsService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Create new region',
        type: RegionDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
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
    async createRegion(@Body() data: CreateRegionDto): Promise<RegionDto> {

        return this.service.createRegion(data);
    }
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of regions',
        type: RegionDto,
        isArray: true
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    async findAllRegions(): Promise<RegionDto[]> {

        return this.service.findAllRegions();
    }
  
    @Get(':id')
    @ApiOkResponse({
        description: 'Get region by id',
        type: RegionDto
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
    async findRegionById(@Param('id', ParseIntPipe) id: number): Promise<RegionDto> {

        return this.service.findRegionById(id);
    }
  
    @Patch(':id')
    @ApiOkResponse({
        description: 'Update region by id',
        type: RegionDto
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
    async updateRegion(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateRegionDto): Promise<RegionDto> {

        return this.service.updateRegion(id, data);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete region by id'
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
    async deleteRegion(@Param('id', ParseIntPipe) id: number): Promise<void> {

        await this.service.deleteRegion(id);
    }
}
