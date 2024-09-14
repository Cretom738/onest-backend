import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    starCount: number;
}