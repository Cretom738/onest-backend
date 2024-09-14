import { CreateReviewDto } from "./dtos/create-review.dto";
import { UpdateReviewDto } from "./dtos/update-review.dto";
import { ReviewWithRelatedTable } from "src/libs/types/prisma.type";
import { FilterReviewDto } from "./dtos/filter-review.dto";

export interface IReviewsService {

    createReview(data: CreateReviewDto, reviewerProfileId: number): Promise<ReviewWithRelatedTable>;

    findAllReviews(filterData: FilterReviewDto): Promise<[ ReviewWithRelatedTable[], number ]>;

    findReviewById(id: number): Promise<ReviewWithRelatedTable>;

    updateReview(id: number, data: UpdateReviewDto, reviewerProfileId: number): Promise<ReviewWithRelatedTable>;

    deleteReview(id: number, reviewerProfileId: number): Promise<void>;
}