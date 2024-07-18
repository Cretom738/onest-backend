import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from 'src/libs/dtos/category.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { RolesGuard } from 'src/libs/guards/roles.guard';
import { ERole } from '@prisma/client';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { CreateCategoryDto } from 'src/libs/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/libs/dtos/update-category.dto';

@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth('Authorization')
export class CategoriesController {
    
    constructor(private readonly service: CategoriesService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Create new category',
        type: CategoryDto
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
    async createCategory(@Body() data: CreateCategoryDto): Promise<CategoryDto> {

        return this.service.createCategory(data);
    }
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of categories',
        type: CategoryDto,
        isArray: true
    })
    async findAllCategories(): Promise<CategoryDto[]> {

        return this.service.findAllCategories();
    }
  
    @Get(':id')
    @ApiOkResponse({
        description: 'Get category by id',
        type: CategoryDto
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findCategoryById(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {

        return this.service.findCategoryById(id);
    }
  
    @Patch(':id')
    @ApiOkResponse({
        description: 'Update category by id',
        type: CategoryDto
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
    async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDto): Promise<CategoryDto> {

        return this.service.updateCategory(id, data);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete category by id'
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
    async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<void> {

        await this.service.deleteCategory(id);
    }
}
