import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsArray, IsOptional, IsPhoneNumber, IsString, Length, Max, Min, ValidateNested } from "class-validator";
import { ProfileWithRelatedTable } from "../types/prisma.type";
import { SocialMediaDto } from "./social-media.dto";
import { Type } from "class-transformer";

export class ProfileDto {

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
    
    @ApiProperty()
    readonly email: string;
    
    @ApiProperty()
    readonly fullName: string;
    
    @ApiProperty()
    readonly isEmailVerified: boolean;

    @ApiProperty({ type: SocialMediaDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ArrayMaxSize(7)
    @ValidateNested({ each: true })
    @Type(() => SocialMediaDto)
    socialMedias: SocialMediaDto[]

    constructor(profile: ProfileWithRelatedTable) {
        this.bio = profile?.bio || null;
        this.phone = profile?.phone || null;
        this.address = profile?.address || null;
        this.web = profile?.web || null;
        this.email = profile?.user.email;
        this.fullName = profile?.user.fullName;
        this.isEmailVerified = profile?.user.isEmailVerified;
        this.socialMedias = profile?.socialMedias.map(sm => new SocialMediaDto(sm));
    }
}