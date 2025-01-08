import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { PaginatedRequestDto } from 'src/libs/dtos/paginated-request.dto';

export class FilterReviewDto extends PaginatedRequestDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsPositive()
  @IsOptional()
  profileId: number;
}
