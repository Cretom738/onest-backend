import { Region } from "@prisma/client";
import { CreateRegionDto } from "./dtos/create-region.dto";
import { UpdateRegionDto } from "./dtos/update-region.dto";
import { PaginatedRequestDto } from "src/libs/dtos/paginated-request.dto";

export interface IRegionsService {

    createRegion(data: CreateRegionDto): Promise<Region>;

    findAllRegions(): Promise<Region[]>;

    findRegionById(id: number): Promise<Region>;

    updateRegion(id: number, data: UpdateRegionDto): Promise<Region>;

    deleteRegion(id: number): Promise<void>;
}