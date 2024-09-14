import { ApiProperty } from "@nestjs/swagger";
import { CreateReviewDto } from "./create-review.dto";
import { Review } from "@prisma/client";
import { ReviewWithRelatedTable } from "src/libs/types/prisma.type";

export class ReviewDto extends CreateReviewDto {

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly reviewerProfileId: number;
    
    @ApiProperty()
    readonly reviewerProfileFullName: string;

    constructor(review: ReviewWithRelatedTable) {
        
        super();

        this.id = review.id;

        this.description = review.description;

        this.starCount = review.starCount;

        this.profileId = review.profileId;

        this.reviewerProfileId = review.reviewerProfileId;

        this.reviewerProfileFullName = review.reviewerProfile.user.fullName;
    }
}