import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'decimal' })
  @IsInt()
  @Min(1)
  @Max(5)
  starCount: Prisma.Decimal;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  profileId: number;
}
