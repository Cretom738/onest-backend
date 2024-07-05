import { ApiProperty } from "@nestjs/swagger";
import { BaseErrorDto } from "./base-error.dto";

export class BadRequestDto extends BaseErrorDto {

    @ApiProperty()
    message: string[];
}