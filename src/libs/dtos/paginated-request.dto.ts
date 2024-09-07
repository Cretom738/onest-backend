import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginatedRequestDto {

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    limit: number = 10;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    @IsOptional()
    offset: number = 0;
}