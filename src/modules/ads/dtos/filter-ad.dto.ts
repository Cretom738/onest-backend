import { ApiPropertyOptional } from '@nestjs/swagger';
import { ECondition } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginatedRequestDto } from 'src/libs/dtos/paginated-request.dto';
import { ERequestType } from 'src/libs/types/type';

export class FilterAdDto extends PaginatedRequestDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @Transform(({ value }) => value.toString().split(',').map(Number))
  subCategoryIds: number[];

  @ApiPropertyOptional()
  @IsEnum(ECondition)
  @IsOptional()
  conditions: ECondition;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @Transform(({ value }) => value.toString().split(',').map(Number))
  cityIds: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;

  @ApiPropertyOptional({ enum: ERequestType })
  @IsEnum(ERequestType)
  @IsOptional()
  type: ERequestType = ERequestType.PUBLIC;
}
