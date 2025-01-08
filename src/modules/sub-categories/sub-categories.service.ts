import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ISubCategoriesService } from './sub-categories';
import { CreateSubCategoryDto } from './dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dtos/update-sub-category.dto';
import { SubCategory } from '@prisma/client';

@Injectable()
export class SubCategoriesService implements ISubCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubCategory(
    categoryId: number,
    { title }: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.create({
      data: {
        title,
        categoryId,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
      },
    });
  }

  async findSubCategoriesByCategoryId(
    categoryId: number,
  ): Promise<SubCategory[]> {
    return this.prisma.subCategory.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
      },
    });
  }

  async findSubCategoryById(subCategoryId: number): Promise<SubCategory> {
    return this.prisma.subCategory.findUniqueOrThrow({
      where: {
        id: subCategoryId,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
      },
    });
  }

  async updateSubCategory(
    categoryId: number,
    subCategoryId: number,
    { title }: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.update({
      where: {
        id: subCategoryId,
      },
      data: {
        title,
        categoryId,
      },
      select: {
        id: true,
        title: true,
        categoryId: true,
      },
    });
  }

  async deleteSubCategory(subCategoryId: number): Promise<void> {
    await this.prisma.subCategory.delete({
      where: {
        id: subCategoryId,
      },
    });
  }
}
