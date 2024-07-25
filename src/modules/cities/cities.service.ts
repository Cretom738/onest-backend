import { Injectable } from '@nestjs/common';
import { CreateCityDto } from 'src/modules/cities/dtos/create-city.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ICitiesService } from './cities';
import { CityDto } from 'src/modules/cities/dtos/city.dto';
import { UpdateCityDto } from 'src/modules/cities/dtos/update-city.dto';

@Injectable()
export class CitiesService implements ICitiesService {

    constructor(private readonly prisma: PrismaService) {}

    async createCity(regionId: number, { title }: CreateCityDto): Promise<CityDto> {

        const city = await this.prisma.city.create({
            data: {
                title,
                regionId
            },
            select: {
                id: true,
                title: true,
                regionId: true
            }
        });

        return new CityDto(city);
    }

    async findCitiesByRegionId(regionId: number): Promise<CityDto[]> {

        const cities = await this.prisma.city.findMany({
            where: {
                regionId
            },
            select: {
                id: true,
                title: true,
                regionId: true
            }
        });

        return cities.map(c => new CityDto(c));
    }

    async findCityById(cityId: number): Promise<CityDto> {

        const city = await this.prisma.city.findUniqueOrThrow({
            where: {
                id: cityId
            },
            select: {
                id: true,
                title: true,
                regionId: true
            }
        });

        return new CityDto(city);
    }

    async updateCity(regionId: number, cityId: number, { title }: UpdateCityDto): Promise<CityDto> {

        const updatedCity = await this.prisma.city.update({
            where: {
                id: cityId
            },
            data: {
                title,
                regionId
            },
            select: {
                id: true,
                title: true,
                regionId: true
            }
        });
        
        return new CityDto(updatedCity);
    }

    async deleteCity(cityId: number): Promise<void> {

        await this.prisma.city.delete({
            where: {
                id: cityId
            }
        });
    }
}
