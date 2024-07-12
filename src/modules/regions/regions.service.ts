import { Injectable } from '@nestjs/common';
import { IRegionsService } from './regions';
import { CreateRegionDto } from 'src/libs/dtos/create-region.dto';
import { RegionDto } from 'src/libs/dtos/region.dto';
import { UpdateRegionDto } from 'src/libs/dtos/update-region.dto';
import { PrismaService } from 'src/libs/services/prisma.service';

@Injectable()
export class RegionsService implements IRegionsService {

    constructor(private readonly prisma: PrismaService) {}

    async createRegion({ title }: CreateRegionDto): Promise<RegionDto> {

        return this.prisma.region.create({
            data: {
                title
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async findAllRegions(): Promise<RegionDto[]> {

        return this.prisma.region.findMany({
            select: {
                id: true,
                title: true
            }
        });
    }

    async findRegionById(id: number): Promise<RegionDto> {

        return this.prisma.region.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async updateRegion(id: number, { title }: UpdateRegionDto): Promise<RegionDto> {

        return this.prisma.region.update({
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
    }

    async deleteRegion(id: number): Promise<void> {

        await this.prisma.region.delete({
            where: {
                id
            }
        });
    }
}
