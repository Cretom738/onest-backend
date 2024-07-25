import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { IAdsService } from './ads';
import { CreateAdDto } from './dtos/create-ad.dto';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { Ad } from '@prisma/client';

@Injectable()
export class AdsService implements IAdsService {

    constructor(private readonly prisma: PrismaService) {}

    async createAd(profileId: number, data: CreateAdDto): Promise<Ad> {

        return this.prisma.ad.create({
            data: {
                ...data,
                profileId
            }
        });
    }

    async findAllAds(): Promise<Ad[]> {

        return this.prisma.ad.findMany();
    }

    async findAdById(id: number): Promise<Ad> {
        
        return this.prisma.ad.findUniqueOrThrow({
            where: {
                id
            }
        });
    }

    async updateAd(profileId: number, id: number, data: UpdateAdDto): Promise<Ad> {

        const ad: { profileId: number } = await this.prisma.ad.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                profileId: true
            }
        });

        if (ad.profileId !== profileId) {

            throw new ForbiddenException('ad.not.belong.to.user');
        }
        
        return this.prisma.ad.update({
            where: {
                id
            },
            data: data
        });
    }

    async deleteAd(profileId: number, id: number): Promise<void> {

        const ad: { profileId: number } = await this.prisma.ad.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                profileId: true
            }
        });

        if (ad.profileId !== profileId) {

            throw new ForbiddenException('ad.not.belong.to.user');
        }
        
        await this.prisma.ad.delete({
            where: {
                id
            }
        });
    }
}
