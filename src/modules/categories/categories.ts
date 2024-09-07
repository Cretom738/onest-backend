import { Category } from "@prisma/client";
import { PaginatedRequestDto } from "src/libs/dtos/paginated-request.dto";
import { CreateCategoryDto } from "src/modules/categories/dtos/create-category.dto";
import { UpdateCategoryDto } from "src/modules/categories/dtos/update-category.dto";

export interface ICategoriesService {

    createCategory(data: CreateCategoryDto): Promise<Category>;

    findAllCategories(): Promise<Category[]>;

    findCategoryById(id: number): Promise<Category>;

    updateCategory(id: number, data: UpdateCategoryDto): Promise<Category>;

    deleteCategory(id: number): Promise<void>;
}