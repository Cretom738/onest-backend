import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsInt, IsOptional, IsPhoneNumber, IsString, IsUrl, Length, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateSocialMediaDto } from "./update-social-media.dto";

export class UpdateProfileDto {

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    bio: string | null;

    @ApiPropertyOptional({ type: 'string' })
    @IsPhoneNumber()
    @IsOptional()
    @Length(7, 15)
    phone: string | null;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    address: string | null;

    @ApiPropertyOptional({ type: 'string' })
    @IsString()
    @IsOptional()
    web: string | null;

    @ApiPropertyOptional({ type: UpdateSocialMediaDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(7)
    @ValidateNested({ each: true })
    @Type(() => UpdateSocialMediaDto)
    socialMedias: UpdateSocialMediaDto[];

    @ApiPropertyOptional()
    @IsInt()
    @Min(1)
    @IsOptional()
    cityId: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsUrl()
    avatarUrl: string;
}