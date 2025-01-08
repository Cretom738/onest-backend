import { SocialMedia } from '@prisma/client';
import { UpdateSocialMediaDto } from './update-social-media.dto';

export class SocialMediaDto extends UpdateSocialMediaDto {
  constructor(socialMedia: SocialMedia) {
    super();
    this.network = socialMedia.network;
    this.url = socialMedia.url;
  }
}
