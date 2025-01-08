import { ApiProperty } from '@nestjs/swagger';
import { ESocialMediaNetwork } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSocialMediaDto {
  @ApiProperty()
  @IsEnum(ESocialMediaNetwork)
  network: ESocialMediaNetwork;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;
}
