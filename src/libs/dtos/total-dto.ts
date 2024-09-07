import { ApiProperty } from "@nestjs/swagger";

export class TotalDto<T> {

    @ApiProperty()
    result: T[];

    @ApiProperty()
    total: number;

    constructor(result: T[]) {
        this.result = result;
        this.total = result.length;
    }
}