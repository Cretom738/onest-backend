import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { ERole, SubCategory } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoryDto } from './dtos/sub-category.dto';
import { CreateSubCategoryDto } from './dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dtos/update-sub-category.dto';
import { PaginatedRequestDto } from 'src/libs/dtos/paginated-request.dto';
import { PaginatedResponseDto } from 'src/libs/dtos/paginated-response.dto';

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
    async createSubCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() data: CreateSubCategoryDto): Promise<SubCategoryDto> {

        let subCategory: SubCategory = await this.service.createSubCategory(categoryId, data);

        return new SubCategoryDto(subCategory);
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

        let subCategories: SubCategory[] = await this.service.findSubCategoriesByCategoryId(categoryId);

        return subCategories.map(sc => new SubCategoryDto(sc));
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
    async findSubCategoryById(@Param('subCategoryId', ParseIntPipe) subCategoryId: number): Promise<SubCategoryDto> {

        let subCategory: SubCategory = await this.service.findSubCategoryById(subCategoryId);

        return new SubCategoryDto(subCategory);
    }
  
    @Patch(':subCategoryId')
    @ApiOkResponse({
        description: 'Update subcategory by id',
        type: SubCategoryDto
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
    async updateSubCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Param('subCategoryId', ParseIntPipe) subCategoryId: number, @Body() data: UpdateSubCategoryDto): Promise<SubCategoryDto> {

        let subCategory: SubCategory = await this.service.updateSubCategory(categoryId, subCategoryId, data);

        return new SubCategoryDto(subCategory);
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
    async deleteSubCategory(@Param('subCategoryId', ParseIntPipe) subCategoryId: number): Promise<void> {

        await this.service.deleteSubCategory(subCategoryId);
    }
}
