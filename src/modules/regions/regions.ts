import { CreateRegionDto } from "src/libs/dtos/create-region.dto";
import { RegionDto } from "src/libs/dtos/region.dto";
import { UpdateRegionDto } from "src/libs/dtos/update-region.dto";

export interface IRegionsService {

    createRegion(data: CreateRegionDto): Promise<RegionDto>;

    findAllRegions(): Promise<RegionDto[]>;

    findRegionById(id: number): Promise<RegionDto>;

    updateRegion(id: number, data: UpdateRegionDto): Promise<RegionDto>;

    deleteRegion(id: number): Promise<void>;
}