import { City } from "@prisma/client";
import { PaginatedRequestDto } from "src/libs/dtos/paginated-request.dto";
import { CreateCityDto } from "src/modules/cities/dtos/create-city.dto";
import { UpdateCityDto } from "src/modules/cities/dtos/update-city.dto";

export interface ICitiesService {

    createCity(regionId: number, data: CreateCityDto): Promise<City>;

    findCitiesByRegionId(regionId: number): Promise<City[]>;

    findCityById(cityId: number): Promise<City>;

    updateCity(regionId: number, cityId: number, data: UpdateCityDto): Promise<City>;

    deleteCity(cityId: number): Promise<void>;
}