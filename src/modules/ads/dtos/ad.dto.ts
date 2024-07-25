import { ApiProperty } from "@nestjs/swagger";
import { CreateAdDto } from "./create-ad.dto";
import { Ad } from "@prisma/client";

export class AdDto extends CreateAdDto {

    @ApiProperty()
    readonly id: number;

    constructor(ad: Ad) {
        super();
        this.id = ad.id;
        this.title = ad.title;
        this.price = ad.price;
        this.description = ad.description;
        this.images = ad.images;
        this.conditions = ad.conditions;
        this.brand = ad.brand;
        this.model = ad.model;
        this.year = ad.year;
        this.isOriginal = ad.isOriginal;
        this.features = ad.features;
        this.address = ad.address;
        this.cityId = ad.cityId;
        this.subCategoryId = ad.subCategoryId;
    }
}