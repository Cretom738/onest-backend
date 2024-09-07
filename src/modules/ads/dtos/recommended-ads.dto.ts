import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class RecommendedAdsDto {

    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    subCategoryId: number;
}