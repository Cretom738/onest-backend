import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { IAdsService } from './ads';
import { CreateAdDto } from './dtos/create-ad.dto';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { Ad, Prisma } from '@prisma/client';
import { RecommendedAdsDto } from './dtos/recommended-ads.dto';
import { FilterAdDto } from './dtos/filter-ad.dto';
import { ERequestType } from 'src/libs/types/type';

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

    async findAllAds({ subCategoryIds, conditions, cityIds, maxPrice, minPrice, limit, offset, type }: FilterAdDto, profileId: number): Promise<[ Ad[], number ]> {

        if (type === ERequestType.PRIVATE && !profileId) throw new BadRequestException();

        const query: Prisma.AdFindManyArgs = {
            where: {
                subCategoryId: {
                    in: subCategoryIds
                },
                cityId: {
                    in: cityIds
                },
                conditions,
                price: {
                    lte: maxPrice,
                    gte: minPrice
                }
            }
        } 

        if (profileId) query.where = {
            ...query.where,
            profileId
        }

        return this.prisma.$transaction([
            this.prisma.ad.findMany({
                ...query,
                skip: offset,
                take: limit
            }),
            this.prisma.ad.count({ 
                where: query.where 
            })
        ]);
    }

    async findAdById(id: number): Promise<Ad> {
        
        return this.prisma.ad.findUniqueOrThrow({
            where: {
                id
            }
        });
    }

    async updateAd(profileId: number, id: number, data: UpdateAdDto): Promise<Ad> {

        await this.checkAccess(profileId, id);
        
        return this.prisma.ad.update({
            where: {
                id
            },
            data: data
        });
    }

    async deleteAd(profileId: number, id: number): Promise<void> {

        await this.checkAccess(profileId, id);
        
        await this.prisma.ad.delete({
            where: {
                id
            }
        });
    }

    async getRecommendedAds(id: number, { subCategoryId }: RecommendedAdsDto): Promise<Ad[]> {

        return this.prisma.ad.findMany({
            where: {
                id: {
                    not: id
                },
                subCategoryId
            },
            take: 5
        });
    }

    private async checkAccess(profileId: number, id: number): Promise<void> {

        const ad: { profileId: number } = await this.findAdById(id);

        if (ad.profileId !== profileId) {

            throw new ForbiddenException('ad.not.belong.to.user');
        }
    }
}
