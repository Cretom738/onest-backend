import { ApiProperty } from "@nestjs/swagger";
import { CreateCityDto } from "./create-city.dto";

export class CityDto extends CreateCityDto {
    
    @ApiProperty()
    id: number;
}