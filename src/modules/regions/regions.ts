import { CreateRegionDto } from "./dtos/create-region.dto";
import { RegionDto } from "./dtos/region.dto";
import { UpdateRegionDto } from "./dtos/update-region.dto";

export interface IRegionsService {

    createRegion(data: CreateRegionDto): Promise<RegionDto>;

    findAllRegions(): Promise<RegionDto[]>;

    findRegionById(id: number): Promise<RegionDto>;

    updateRegion(id: number, data: UpdateRegionDto): Promise<RegionDto>;

    deleteRegion(id: number): Promise<void>;
}