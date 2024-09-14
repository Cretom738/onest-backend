import { ApiProperty } from "@nestjs/swagger";

export class FileDto {

    @ApiProperty()
    url: string;

    constructor(url: string) {
        
        this.url = url;
    }
}