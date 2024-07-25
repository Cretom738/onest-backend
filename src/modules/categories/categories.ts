import { CategoryDto } from "src/modules/categories/dtos/category.dto";
import { CreateCategoryDto } from "src/modules/categories/dtos/create-category.dto";
import { UpdateCategoryDto } from "src/modules/categories/dtos/update-category.dto";

export interface ICategoriesService {

    createCategory(data: CreateCategoryDto): Promise<CategoryDto>;

    findAllCategories(): Promise<CategoryDto[]>;

    findCategoryById(id: number): Promise<CategoryDto>;

    updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto>;

    deleteCategory(id: number): Promise<void>;
}