import { ApiProperty } from "@nestjs/swagger";
import { PaginatedRequestDto } from "./paginated-request.dto";

export class PaginatedResponseDto<T> extends PaginatedRequestDto {

    @ApiProperty({ isArray: true })
    result: T[];

    @ApiProperty()
    count: number;

    constructor(data: PaginatedResponseDto<T>) {
        super();
        this.result = data.result;
        this.count = data.count;
        this.offset = data.offset;
        this.limit = data.limit;
    }
}