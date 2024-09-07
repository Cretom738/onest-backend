import { Injectable } from '@nestjs/common';
import { ICategoriesService } from './categories';
import { PrismaService } from 'src/libs/services/prisma.service';
import { CreateCategoryDto } from 'src/modules/categories/dtos/create-category.dto';
import { UpdateCategoryDto } from 'src/modules/categories/dtos/update-category.dto';
import { Category } from '@prisma/client';
import { PaginatedRequestDto } from 'src/libs/dtos/paginated-request.dto';

@Injectable()
export class CategoriesService implements ICategoriesService {

    constructor(private readonly prisma: PrismaService) {}

    async createCategory({ title }: CreateCategoryDto): Promise<Category> {

        return this.prisma.category.create({
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async findAllCategories({ limit, offset }: PaginatedRequestDto): Promise<Category[]> {

        return this.prisma.category.findMany({
            select: {
                id: true,
                title: true
            },
            skip: offset,
            take: limit
        });
    }

    async findCategoryById(id: number): Promise<Category> {

        return this.prisma.category.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async updateCategory(id: number, { title }: UpdateCategoryDto): Promise<Category> {

        return this.prisma.category.update({
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
    }

    async deleteCategory(id: number): Promise<void> {

        await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}