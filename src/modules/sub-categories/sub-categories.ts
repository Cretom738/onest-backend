import { CreateSubCategoryDto } from "src/libs/dtos/create-sub-category.dto";
import { SubCategoryDto } from "src/libs/dtos/sub-category.dto";
import { UpdateSubCategoryDto } from "src/libs/dtos/update-sub-category.dto";

export interface ISubCategoriesService {

    createSubCategory(categoryId: number, data: CreateSubCategoryDto): Promise<SubCategoryDto>;

    findSubCategoriesByCategoryId(categoryId: number): Promise<SubCategoryDto[]>;

    findSubCategoryById(subCategoryId: number): Promise<SubCategoryDto>;

    updateSubCategory(categoryId: number, subCategoryId: number, data: UpdateSubCategoryDto): Promise<SubCategoryDto>;

    deleteSubCategory(subCategoryId: number): Promise<void>;
}