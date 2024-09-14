import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IJwtPayload } from 'src/libs/interfaces/jwt-payload.interface';
import { UserInfo } from 'src/libs/decorators/user-info.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { FilterReviewDto } from './dtos/filter-review.dto';
import { PaginatedResponseDto } from 'src/libs/dtos/paginated-response.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { ReviewDto } from './dtos/review.dto';
import { ReviewWithRelatedTable } from 'src/libs/types/prisma.type';

@Controller('reviews')
@ApiTags('Reviews')
@ApiBearerAuth('Authorization')
export class ReviewsController {

    constructor(private readonly service: ReviewsService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Create new review',
        type: ReviewDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: CommonErrorDto
    })
    @ApiConflictResponse({
        description: 'Conflict',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async createReview(@Body() data: CreateReviewDto, @UserInfo() { profileId }: IJwtPayload): Promise<ReviewDto> {

        const review: ReviewWithRelatedTable = await this.service.createReview(data, profileId);

        return new ReviewDto(review);
    }
  
    @Get()
    @ApiOkResponse({
        description: 'Get list of reviews',
        type: ReviewDto,
        isArray: true
    })
    @ApiBadRequestResponse({
        description: 'Validation error',
        type: BadRequestDto
    })
    async findAllReviews(@Query() filterData: FilterReviewDto): Promise<PaginatedResponseDto<ReviewDto>> {
 
        const [ reviews, count ] = await this.service.findAllReviews(filterData);

        return new PaginatedResponseDto({
            result: reviews.map(r => new ReviewDto(r)),
            count,
            offset: filterData.offset,
            limit: filterData.limit
        });
    }
  
    @Get(':id')
    @ApiOkResponse({
        description: 'Get review by id',
        type: ReviewDto
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    async findReviewById(@Param('id', ParseIntPipe) id: number): Promise<ReviewDto> {

        const review: ReviewWithRelatedTable = await this.service.findReviewById(id);

        return new ReviewDto(review);
    }
  
    @Patch(':id')
    @ApiOkResponse({
        description: 'Update review by id',
        type: ReviewDto
    })
    @ApiBadRequestResponse({
        description: 'Validation error or id validation error',
        type: BadRequestDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async updateReview(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateReviewDto, @UserInfo() { profileId }: IJwtPayload): Promise<ReviewDto> {

        const review: ReviewWithRelatedTable = await this.service.updateReview(id, data, profileId);

        return new ReviewDto(review);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({
        description: 'Delete review by id'
    })
    @ApiBadRequestResponse({
        description: 'Id validation error',
        type: CommonErrorDto
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: CommonErrorDto
    })
    @ApiForbiddenResponse({
        description: 'Forbidden',
        type: CommonErrorDto
    })
    @ApiNotFoundResponse({
        description: 'Not found',
        type: CommonErrorDto
    })
    @UseGuards(AuthGuard)
    async deleteReview(@Param('id', ParseIntPipe) id: number, @UserInfo() { profileId }: IJwtPayload): Promise<void> {

        await this.service.deleteReview(id, profileId);
    }
}
