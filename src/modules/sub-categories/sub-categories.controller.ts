import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { ERole } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoryDto } from 'src/libs/dtos/sub-category.dto';
import { CreateSubCategoryDto } from 'src/libs/dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from 'src/libs/dtos/update-sub-category.dto';

@Controller('categories/:categoryId/sub-categories')
@ApiTags('SubCategories')
@ApiBearerAuth('Authorization')
export class SubCategoriesController {
    
    constructor(private readonly service: SubCategoriesService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Create new subcategory',
        type: SubCategoryDto
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
    async createSubCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() data: CreateSubCategoryDto): Promise<SubCategoryDto> {

        return this.service.createSubCategory(categoryId, data);
    }
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of subcategories',
        type: SubCategoryDto,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    async findSubCategoriesByCategoryId(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<SubCategoryDto[]> {

        return this.service.findSubCategoriesByCategoryId(categoryId);
    }
  
    @Get(':subCategoryId')
    @ApiOkResponse({
        description: 'Get subcategory by id',
        type: SubCategoryDto
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findSubCategoryById(@Param('categoryId', ParseIntPipe) categoryId: number, @Param('subCategoryId', ParseIntPipe) subCategoryId: number): Promise<SubCategoryDto> {

        return this.service.findSubCategoryById(subCategoryId);
    }
  
    @Patch(':subCategoryId')
    @ApiOkResponse({
        description: 'Update subcategory by id',
        type: SubCategoryDto
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
    async updateSubCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Param('subCategoryId', ParseIntPipe) subCategoryId: number, @Body() data: UpdateSubCategoryDto): Promise<SubCategoryDto> {

        return this.service.updateSubCategory(categoryId, subCategoryId, data);
    }
  
    @Delete(':subCategoryId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete subcategory by id'
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
    async deleteSubCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Param('subCategoryId', ParseIntPipe) subCategoryId: number): Promise<void> {

        await this.service.deleteSubCategory(subCategoryId);
    }
}
