import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    starCount: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    profileId: number;
}