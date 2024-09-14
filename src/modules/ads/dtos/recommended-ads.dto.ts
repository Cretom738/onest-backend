import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class RecommendedAdsDto {

    @ApiProperty()
    @IsInt()
    @Transform(({ value }) => Number(value))
    subCategoryId: number;
}