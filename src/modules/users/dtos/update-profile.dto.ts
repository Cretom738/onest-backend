import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Min, ValidateNested } from "class-validator";
import { ProfileWithRelatedTable } from "../../../libs/types/prisma.type";
import { SocialMediaDto } from "./social-media.dto";
import { Type } from "class-transformer";
import { UpdateSocialMediaDto } from "./update-social-media.dto";

export class UpdateProfileDto {

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    bio: string | null;

    @ApiProperty({ type: 'string' })
    @IsPhoneNumber()
    @IsOptional()
    @Length(7, 15)
    phone: string | null;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    address: string | null;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsOptional()
    web: string | null;

    @ApiProperty({ type: UpdateSocialMediaDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(7)
    @ValidateNested({ each: true })
    @Type(() => UpdateSocialMediaDto)
    socialMedias: UpdateSocialMediaDto[];

    @ApiProperty()
    @IsNumber()
    @Min(1)
    cityId: number;
}