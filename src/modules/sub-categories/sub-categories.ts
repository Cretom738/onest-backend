import { CreateSubCategoryDto } from "./dtos/create-sub-category.dto";
import { SubCategoryDto } from "./dtos/sub-category.dto";
import { UpdateSubCategoryDto } from "./dtos/update-sub-category.dto";

export interface ISubCategoriesService {

    createSubCategory(categoryId: number, data: CreateSubCategoryDto): Promise<SubCategoryDto>;

    findSubCategoriesByCategoryId(categoryId: number): Promise<SubCategoryDto[]>;

    findSubCategoryById(subCategoryId: number): Promise<SubCategoryDto>;

    updateSubCategory(categoryId: number, subCategoryId: number, data: UpdateSubCategoryDto): Promise<SubCategoryDto>;

    deleteSubCategory(subCategoryId: number): Promise<void>;
}