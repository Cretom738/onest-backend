import { CategoryDto } from "src/libs/dtos/category.dto";
import { CreateCategoryDto } from "src/libs/dtos/create-category.dto";
import { UpdateCategoryDto } from "src/libs/dtos/update-category.dto";

export interface ICategoriesService {

    createCategory(data: CreateCategoryDto): Promise<CategoryDto>;

    findAllCategories(): Promise<CategoryDto[]>;

    findCategoryById(id: number): Promise<CategoryDto>;

    updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto>;

    deleteCategory(id: number): Promise<void>;
}