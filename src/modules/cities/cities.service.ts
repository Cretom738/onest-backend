import { Injectable } from '@nestjs/common';
import { CreateCityDto } from 'src/libs/dtos/create-city.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ICitiesService } from './cities';
import { CityDto } from 'src/libs/dtos/city.dto';
import { UpdateCityDto } from 'src/libs/dtos/update-city.dto';

@Injectable()
export class CitiesService implements ICitiesService {

    constructor(private readonly prisma: PrismaService) {}

    async createCity(regionId: number, { title }: CreateCityDto): Promise<CityDto> {

        return this.prisma.city.create({
            data: {
                title,
                regionId
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async findCitiesByRegionId(regionId: number): Promise<CityDto[]> {

        return this.prisma.city.findMany({
            where: {
                regionId
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async findCityById(cityId: number): Promise<CityDto> {

        return this.prisma.region.findUniqueOrThrow({
            where: {
                id: cityId
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async updateCity(regionId: number, cityId: number, { title }: UpdateCityDto): Promise<CityDto> {

        return this.prisma.city.update({
            where: {
                id: cityId
            },
            data: {
                title,
                regionId
            },
            select: {
                id: true,
                title: true
            }
        });
    }

    async deleteCity(cityId: number): Promise<void> {

        await this.prisma.city.delete({
            where: {
                id: cityId
            }
        });
    }
}
