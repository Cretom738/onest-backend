import { Ad } from "@prisma/client";
import { CreateAdDto } from "./dtos/create-ad.dto";
import { UpdateAdDto } from "./dtos/update-ad.dto";

export interface IAdsService {

    createAd(profileId: number, data: CreateAdDto): Promise<Ad>;

    findAllAds(): Promise<Ad[]>;

    findAdById(id: number): Promise<Ad>;

    updateAd(profileId: number, id: number, data: UpdateAdDto): Promise<Ad>;

    deleteAd(profileId: number, id: number): Promise<void>;
}