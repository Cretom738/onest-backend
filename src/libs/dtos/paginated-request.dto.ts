import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginatedRequestDto {

    @ApiPropertyOptional()
    @IsInt()
    @Min(0)
    @IsOptional()
    limit: number = 10;

    @ApiPropertyOptional()
    @IsInt()
    @Min(0)
    @IsOptional()
    offset: number = 0;
}