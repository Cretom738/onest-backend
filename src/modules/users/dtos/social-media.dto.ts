import { ApiProperty } from '@nestjs/swagger';
import { ESocialMediaNetwork } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialMedia } from "@prisma/client";
import { UpdateSocialMediaDto } from './update-social-media.dto';

export class SocialMediaDto extends UpdateSocialMediaDto {

    constructor(socialMedia: SocialMedia) {
        super();
        this.network = socialMedia.network;
        this.url = socialMedia.url;
    }
}