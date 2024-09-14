import { ApiProperty } from "@nestjs/swagger";
import { ProfileWithRelatedTable } from "../../../libs/types/prisma.type";
import { SocialMediaDto } from "./social-media.dto";
import { UpdateProfileDto } from "./update-profile.dto";

export class ProfileDto extends UpdateProfileDto {
    
    @ApiProperty()
    readonly email: string;
    
    @ApiProperty()
    readonly fullName: string;
    
    @ApiProperty()
    readonly isEmailVerified: boolean;

    constructor(profile: ProfileWithRelatedTable) {
        super();
        this.bio = profile.bio;
        this.phone = profile.phone;
        this.address = profile.address;
        this.web = profile.web;
        this.email = profile.user.email;
        this.fullName = profile.user.fullName;
        this.isEmailVerified = profile.user.isEmailVerified;
        this.socialMedias = profile.socialMedias.map(sm => new SocialMediaDto(sm));
        this.cityId = profile.cityId;
    }
}