import { ApiProperty } from "@nestjs/swagger";
import { CreateRegionDto } from "./create-region.dto";

export class RegionDto extends CreateRegionDto {
    
    @ApiProperty()
    id: number;
}