import { CityDto } from "src/libs/dtos/city.dto";
import { CreateCityDto } from "src/libs/dtos/create-city.dto";
import { UpdateCityDto } from "src/libs/dtos/update-city.dto";

export interface ICitiesService {

    createCity(regionId: number, data: CreateCityDto): Promise<CityDto>;

    findCitiesByRegionId(regionId: number): Promise<CityDto[]>;

    findCityById(cityId: number): Promise<CityDto>;

    updateCity(regionId: number, cityId: number, data: UpdateCityDto): Promise<CityDto>;

    deleteCity(cityId: number): Promise<void>;
}