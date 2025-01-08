import { ForbiddenException, Injectable } from '@nestjs/common';
import { IReviewsService } from './reviews';
import { ReviewWithRelatedTable } from 'src/libs/types/prisma.type';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { Prisma } from '@prisma/client';
import { FilterReviewDto } from './dtos/filter-review.dto';

@Injectable()
export class ReviewsService implements IReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(
    { description, starCount, profileId }: CreateReviewDto,
    reviewerProfileId: number,
  ): Promise<ReviewWithRelatedTable> {
    if (profileId === reviewerProfileId) {
      throw new ForbiddenException('self.review.not.allowed');
    }

    return this.prisma.review.create({
      data: {
        description,
        starCount,
        profileId,
        reviewerProfileId,
      },
      select: {
        id: true,
        description: true,
        starCount: true,
        profileId: true,
        reviewerProfileId: true,
        reviewerProfile: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  }

  async findAllReviews({
    profileId,
    limit,
    offset,
  }: FilterReviewDto): Promise<[ReviewWithRelatedTable[], number]> {
    const query: Prisma.ReviewFindManyArgs = {
      where: {
        profileId,
      },
    };

    return this.prisma.$transaction([
      this.prisma.review.findMany({
        where: query.where,
        select: {
          id: true,
          description: true,
          starCount: true,
          profileId: true,
          reviewerProfileId: true,
          reviewerProfile: {
            select: {
              user: {
                select: {
                  fullName: true,
                },
              },
            },
          },
        },
        skip: offset,
        take: limit,
      }),
      this.prisma.review.count({
        where: query.where,
      }),
    ]);
  }

  async findReviewById(id: number): Promise<ReviewWithRelatedTable> {
    return this.prisma.review.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        description: true,
        starCount: true,
        profileId: true,
        reviewerProfileId: true,
        reviewerProfile: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  }

  async updateReview(
    id: number,
    { description, starCount }: UpdateReviewDto,
    reviewerProfileId: number,
  ): Promise<ReviewWithRelatedTable> {
    await this.checkAccess(reviewerProfileId, id);

    return this.prisma.review.update({
      where: {
        id,
      },
      data: {
        description,
        starCount,
      },
      select: {
        id: true,
        description: true,
        starCount: true,
        profileId: true,
        reviewerProfileId: true,
        reviewerProfile: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteReview(id: number, reviewerProfileId: number): Promise<void> {
    await this.checkAccess(reviewerProfileId, id);

    await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }

  async checkAccess(reviewerProfileId: number, id: number): Promise<void> {
    const review: { reviewerProfileId: number } =
      await this.prisma.review.findFirstOrThrow({
        where: {
          id,
        },
        select: {
          reviewerProfileId: true,
        },
      });

    if (review.reviewerProfileId !== reviewerProfileId) {
      throw new ForbiddenException('review.not.belong.to.user');
    }
  }
}
