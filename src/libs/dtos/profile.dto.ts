import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";
import { Profile } from '@prisma/client';
import { ProfileWithUser } from "../types/prisma.type";

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

    constructor(profile: ProfileWithUser) {
        this.bio = profile.bio || null;
        this.phone = profile.phone || null;
        this.address = profile.address || null;
        this.web = profile.web || null;
        this.email = profile.user.email;
    }
}