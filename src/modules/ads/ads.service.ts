import { Injectable } from '@nestjs/common';
import { IAdsService } from './ads';
import { CreateAdDto } from './dtos/create-ad.dto';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { Ad } from '@prisma/client';

@Injectable()
export class AdsService implements IAdsService {

    constructor(private readonly prisma: PrismaService) {}

    async createAd(profileId: number, data: CreateAdDto): Promise<Ad> {

        return await this.prisma.ad.create({
            data: {
                ...data,
                profileId
            }
        });
    }

    async findAllAds(): Promise<Ad[]> {
        throw new Error('Method not implemented.');
    }

    async findAdById(id: number): Promise<Ad> {
        throw new Error('Method not implemented.');
    }

    async updateAd(id: number, data: UpdateAdDto): Promise<Ad> {
        throw new Error('Method not implemented.');
    }

    async deleteAd(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}
