import { ApiProperty } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { SubCategory } from '@prisma/client';

export class SubCategoryDto extends CreateSubCategoryDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly categoryId: number;

  constructor(subCategory: SubCategory) {
    super();
    this.title = subCategory.title;
    this.id = subCategory.id;
    this.categoryId = subCategory.categoryId;
  }
}
