import { Ad } from '@prisma/client';
import { CreateAdDto } from './dtos/create-ad.dto';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { RecommendedAdsDto } from './dtos/recommended-ads.dto';
import { FilterAdDto } from './dtos/filter-ad.dto';

export interface IAdsService {
  createAd(profileId: number, data: CreateAdDto): Promise<Ad>;

  findAllAds(
    filterData: FilterAdDto,
    profileId: number,
  ): Promise<[Ad[], number]>;

  findAdById(id: number): Promise<Ad>;

  updateAd(profileId: number, id: number, data: UpdateAdDto): Promise<Ad>;

  deleteAd(profileId: number, id: number): Promise<void>;

  getRecommendedAds(
    id: number,
    recommendedAdsData: RecommendedAdsDto,
  ): Promise<Ad[]>;
}
