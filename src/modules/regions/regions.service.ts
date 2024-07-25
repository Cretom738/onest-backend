import { Injectable } from '@nestjs/common';
import { IRegionsService } from './regions';
import { CreateRegionDto } from './dtos/create-region.dto';
import { RegionDto } from './dtos/region.dto';
import { UpdateRegionDto } from './dtos/update-region.dto';
import { PrismaService } from 'src/libs/services/prisma.service';

@Injectable()
export class RegionsService implements IRegionsService {

    constructor(private readonly prisma: PrismaService) {}

    async createRegion({ title }: CreateRegionDto): Promise<RegionDto> {

        const region = await this.prisma.region.create({
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });

        return new RegionDto(region);
    }

    async findAllRegions(): Promise<RegionDto[]> {

        const regions = await this.prisma.region.findMany({
            select: {
                id: true,
                title: true
            }
        });

        return regions.map(r => new RegionDto(r));
    }

    async findRegionById(id: number): Promise<RegionDto> {

        const region = await this.prisma.region.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                id: true,
                title: true
            }
            
        });

        return new RegionDto(region);
    }

    async updateRegion(id: number, { title }: UpdateRegionDto): Promise<RegionDto> {

        const updatedRegion = await this.prisma.region.update({
            where: {
                id
            },
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });
        
        return new RegionDto(updatedRegion);
    }

    async deleteRegion(id: number): Promise<void> {

        await this.prisma.region.delete({
            where: {
                id
            }
        });
    }
}
