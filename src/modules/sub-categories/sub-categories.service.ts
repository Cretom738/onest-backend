import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ISubCategoriesService } from './sub-categories';
import { SubCategoryDto } from 'src/libs/dtos/sub-category.dto';
import { CreateSubCategoryDto } from 'src/libs/dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from 'src/libs/dtos/update-sub-category.dto';

@Injectable()
export class SubCategoriesService implements ISubCategoriesService {

    constructor(private readonly prisma: PrismaService) {}

    async createSubCategory(categoryId: number, { title }: CreateSubCategoryDto): Promise<SubCategoryDto> {

        const subCategory = await this.prisma.subCategory.create({
            data: {
                title,
                categoryId
            },
            select: {
                id: true,
                title: true,
                categoryId: true
            }
        });

        return new SubCategoryDto(subCategory);
    }

    async findSubCategoriesByCategoryId(categoryId: number): Promise<SubCategoryDto[]> {

        const subCategories = await this.prisma.subCategory.findMany({
            where: {
                categoryId
            },
            select: {
                id: true,
                title: true,
                categoryId: true
            }
        });

        return subCategories.map(sc => new SubCategoryDto(sc));
    }

    async findSubCategoryById(subCategoryId: number): Promise<SubCategoryDto> {

        const subCategory = await this.prisma.subCategory.findUniqueOrThrow({
            where: {
                id: subCategoryId
            },
            select: {
                id: true,
                title: true,
                categoryId: true
            }
        });

        return new SubCategoryDto(subCategory);
    }

    async updateSubCategory(categoryId: number, subCategoryId: number, { title }: UpdateSubCategoryDto): Promise<SubCategoryDto> {

        const updatedSubCategory = await this.prisma.subCategory.update({
            where: {
                id: subCategoryId
            },
            data: {
                title,
                categoryId
            },
            select: {
                id: true,
                title: true,
                categoryId: true
            }
        });
        
        return new SubCategoryDto(updatedSubCategory);
    }

    async deleteSubCategory(subCategoryId: number): Promise<void> {

        await this.prisma.subCategory.delete({
            where: {
                id: subCategoryId
            }
        });
    }
}

