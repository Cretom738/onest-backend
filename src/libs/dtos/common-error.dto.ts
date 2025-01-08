import { ApiProperty } from '@nestjs/swagger';
import { BaseErrorDto } from './base-error.dto';

export class CommonErrorDto extends BaseErrorDto {
  @ApiProperty()
  message: string;
}
