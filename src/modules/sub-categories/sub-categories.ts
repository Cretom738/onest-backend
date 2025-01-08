import { SubCategory } from '@prisma/client';
import { CreateSubCategoryDto } from './dtos/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dtos/update-sub-category.dto';

export interface ISubCategoriesService {
  createSubCategory(
    categoryId: number,
    data: CreateSubCategoryDto,
  ): Promise<SubCategory>;

  findSubCategoriesByCategoryId(categoryId: number): Promise<SubCategory[]>;

  findSubCategoryById(subCategoryId: number): Promise<SubCategory>;

  updateSubCategory(
    categoryId: number,
    subCategoryId: number,
    data: UpdateSubCategoryDto,
  ): Promise<SubCategory>;

  deleteSubCategory(subCategoryId: number): Promise<void>;
}
