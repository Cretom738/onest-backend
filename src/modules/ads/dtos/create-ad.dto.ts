import { ApiProperty } from "@nestjs/swagger";
import { ECondition } from "@prisma/client";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateAdDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty({ type: 'string', isArray: true })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    images: string[];

    @ApiProperty()
    @IsEnum(ECondition)
    @IsOptional()
    conditions: ECondition;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    brand: string | null;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    model: string | null;

    @ApiProperty({ type: 'number' })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    year: number | null;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isOriginal: boolean;

    @ApiProperty({ type: 'string', isArray: true })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    features: string[];

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    address: string | null;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    cityId: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    subCategoryId: number;
}