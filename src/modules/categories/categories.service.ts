import { Injectable } from '@nestjs/common';
import { ICategoriesService } from './categories';
import { PrismaService } from 'src/libs/services/prisma.service';
import { CategoryDto } from 'src/libs/dtos/category.dto';
import { CreateCategoryDto } from 'src/libs/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/libs/dtos/update-category.dto';

@Injectable()
export class CategoriesService implements ICategoriesService {

    constructor(private readonly prisma: PrismaService) {}

    async createCategory({ title }: CreateCategoryDto): Promise<CategoryDto> {

        const category = await this.prisma.category.create({
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });

        return new CategoryDto(category);
    }

    async findAllCategories(): Promise<CategoryDto[]> {

        const categories = await this.prisma.category.findMany({
            select: {
                id: true,
                title: true
            }
        });

        return categories.map(c => new CategoryDto(c));
    }

    async findCategoryById(id: number): Promise<CategoryDto> {

        const category = await this.prisma.category.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                id: true,
                title: true
            }
            
        });

        return new CategoryDto(category);
    }

    async updateCategory(id: number, { title }: UpdateCategoryDto): Promise<CategoryDto> {

        const updatedCategory = await this.prisma.category.update({
            where: {
                id
            },
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });
        
        return new CategoryDto(updatedCategory);
    }

    async deleteCategory(id: number): Promise<void> {

        await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}