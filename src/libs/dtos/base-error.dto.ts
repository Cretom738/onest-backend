import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorDto {
  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
